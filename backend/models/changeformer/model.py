"""
ChangeFormer — A Transformer-Based Siamese Network for Change Detection.
Reference: Bandara & Patel, "A Transformer-Based Siamese Network for Change Detection",
IEEE IGARSS 2022 / arXiv:2201.01293.

Architecture:
  1. Hierarchical Siamese Transformer Encoder: Multi-scale feature extraction
     at 4 stages (1/4, 1/8, 1/16, 1/32) with shared weights across T0 and T1.
  2. Multi-Scale Difference Module: Calculates absolute feature divergence
     |F_t0^(i) - F_t1^(i)| across all 4 hierarchical scales.
  3. Feature Aggregation Decoder: Upsamples and fuses multi-scale difference
     representations to generate pixel-level 2-class change logits (no-change vs change).
"""
from __future__ import annotations
import math
from typing import List, Tuple, Optional
import torch
import torch.nn as nn
import torch.nn.functional as F


class OverlapPatchEmbed(nn.Module):
    """Image / Feature Map to Overlapping Patch Embedding."""
    def __init__(
        self,
        patch_size: int = 7,
        stride: int = 4,
        in_chans: int = 3,
        embed_dim: int = 64,
    ):
        super().__init__()
        self.proj = nn.Conv2d(
            in_chans,
            embed_dim,
            kernel_size=patch_size,
            stride=stride,
            padding=patch_size // 2,
        )
        self.norm = nn.LayerNorm(embed_dim)

    def forward(self, x: torch.Tensor) -> Tuple[torch.Tensor, int, int]:
        x = self.proj(x)
        _, _, H, W = x.shape
        x = x.flatten(2).transpose(1, 2)  # B, N, C
        x = self.norm(x)
        return x, H, W


class EfficientSelfAttention(nn.Module):
    """Efficient Multi-Head Self Attention with spatial reduction."""
    def __init__(
        self,
        dim: int,
        num_heads: int = 8,
        qkv_bias: bool = False,
        attn_drop: float = 0.0,
        proj_drop: float = 0.0,
        sr_ratio: int = 1,
    ):
        super().__init__()
        self.dim = dim
        self.num_heads = num_heads
        head_dim = dim // num_heads
        self.scale = head_dim ** -0.5

        self.q = nn.Linear(dim, dim, bias=qkv_bias)
        self.kv = nn.Linear(dim, dim * 2, bias=qkv_bias)
        self.attn_drop = nn.Dropout(attn_drop)
        self.proj = nn.Linear(dim, dim)
        self.proj_drop = nn.Dropout(proj_drop)

        self.sr_ratio = sr_ratio
        if sr_ratio > 1:
            self.sr = nn.Conv2d(dim, dim, kernel_size=sr_ratio, stride=sr_ratio)
            self.norm = nn.LayerNorm(dim)

    def forward(self, x: torch.Tensor, H: int, W: int) -> torch.Tensor:
        B, N, C = x.shape
        q = self.q(x).reshape(B, N, self.num_heads, C // self.num_heads).permute(0, 2, 1, 3)

        if self.sr_ratio > 1:
            x_ = x.permute(0, 2, 1).reshape(B, C, H, W)
            x_ = self.sr(x_).reshape(B, C, -1).permute(0, 2, 1)
            x_ = self.norm(x_)
            kv = self.kv(x_).reshape(B, -1, 2, self.num_heads, C // self.num_heads).permute(2, 0, 3, 1, 4)
        else:
            kv = self.kv(x).reshape(B, -1, 2, self.num_heads, C // self.num_heads).permute(2, 0, 3, 1, 4)

        k, v = kv[0], kv[1]

        attn = (q @ k.transpose(-2, -1)) * self.scale
        attn = attn.softmax(dim=-1)
        attn = self.attn_drop(attn)

        x = (attn @ v).transpose(1, 2).reshape(B, N, C)
        x = self.proj(x)
        x = self.proj_drop(x)
        return x


class MLPBlock(nn.Module):
    """Feed-Forward Network with Depthwise Convolution."""
    def __init__(
        self,
        in_features: int,
        hidden_features: Optional[int] = None,
        out_features: Optional[int] = None,
        drop: float = 0.0,
    ):
        super().__init__()
        out_features = out_features or in_features
        hidden_features = hidden_features or in_features
        self.fc1 = nn.Linear(in_features, hidden_features)
        self.dwconv = nn.Conv2d(hidden_features, hidden_features, 3, 1, 1, bias=True, groups=hidden_features)
        self.act = nn.GELU()
        self.fc2 = nn.Linear(hidden_features, out_features)
        self.drop = nn.Dropout(drop)

    def forward(self, x: torch.Tensor, H: int, W: int) -> torch.Tensor:
        B, N, C = x.shape
        x = self.fc1(x)
        x = x.transpose(1, 2).view(B, -1, H, W)
        x = self.dwconv(x)
        x = self.act(x)
        x = x.flatten(2).transpose(1, 2)
        x = self.drop(x)
        x = self.fc2(x)
        x = self.drop(x)
        return x


class TransformerBlock(nn.Module):
    """Hierarchical Transformer Stage Block."""
    def __init__(
        self,
        dim: int,
        num_heads: int,
        mlp_ratio: float = 4.0,
        qkv_bias: bool = False,
        drop: float = 0.0,
        attn_drop: float = 0.0,
        sr_ratio: int = 1,
    ):
        super().__init__()
        self.norm1 = nn.LayerNorm(dim)
        self.attn = EfficientSelfAttention(
            dim,
            num_heads=num_heads,
            qkv_bias=qkv_bias,
            attn_drop=attn_drop,
            proj_drop=drop,
            sr_ratio=sr_ratio,
        )
        self.norm2 = nn.LayerNorm(dim)
        self.mlp = MLPBlock(
            in_features=dim,
            hidden_features=int(dim * mlp_ratio),
            drop=drop,
        )

    def forward(self, x: torch.Tensor, H: int, W: int) -> torch.Tensor:
        x = x + self.attn(self.norm1(x), H, W)
        x = x + self.mlp(self.norm2(x), H, W)
        return x


class SiameseTransformerEncoder(nn.Module):
    """
    Siamese 4-stage hierarchical Transformer backbone.
    Shared weights encode both T0 and T1 images into multi-scale representations.
    """
    def __init__(
        self,
        in_chans: int = 3,
        embed_dims: Tuple[int, ...] = (64, 128, 320, 512),
        num_heads: Tuple[int, ...] = (1, 2, 5, 8),
        mlp_ratios: Tuple[float, ...] = (4.0, 4.0, 4.0, 4.0),
        sr_ratios: Tuple[int, ...] = (8, 4, 2, 1),
        depths: Tuple[int, ...] = (2, 2, 2, 2),
    ):
        super().__init__()
        self.depths = depths
        self.embed_dims = embed_dims

        # Stage 1 (1/4 scale)
        self.patch_embed1 = OverlapPatchEmbed(patch_size=7, stride=4, in_chans=in_chans, embed_dim=embed_dims[0])
        self.block1 = nn.ModuleList([
            TransformerBlock(embed_dims[0], num_heads[0], mlp_ratios[0], sr_ratio=sr_ratios[0])
            for _ in range(depths[0])
        ])
        self.norm1 = nn.LayerNorm(embed_dims[0])

        # Stage 2 (1/8 scale)
        self.patch_embed2 = OverlapPatchEmbed(patch_size=3, stride=2, in_chans=embed_dims[0], embed_dim=embed_dims[1])
        self.block2 = nn.ModuleList([
            TransformerBlock(embed_dims[1], num_heads[1], mlp_ratios[1], sr_ratio=sr_ratios[1])
            for _ in range(depths[1])
        ])
        self.norm2 = nn.LayerNorm(embed_dims[1])

        # Stage 3 (1/16 scale)
        self.patch_embed3 = OverlapPatchEmbed(patch_size=3, stride=2, in_chans=embed_dims[1], embed_dim=embed_dims[2])
        self.block3 = nn.ModuleList([
            TransformerBlock(embed_dims[2], num_heads[2], mlp_ratios[2], sr_ratio=sr_ratios[2])
            for _ in range(depths[2])
        ])
        self.norm3 = nn.LayerNorm(embed_dims[2])

        # Stage 4 (1/32 scale)
        self.patch_embed4 = OverlapPatchEmbed(patch_size=3, stride=2, in_chans=embed_dims[2], embed_dim=embed_dims[3])
        self.block4 = nn.ModuleList([
            TransformerBlock(embed_dims[3], num_heads[3], mlp_ratios[3], sr_ratio=sr_ratios[3])
            for _ in range(depths[3])
        ])
        self.norm4 = nn.LayerNorm(embed_dims[3])

    def forward(self, x: torch.Tensor) -> List[torch.Tensor]:
        B = x.shape[0]
        outs = []

        # Stage 1
        x, H, W = self.patch_embed1(x)
        for blk in self.block1:
            x = blk(x, H, W)
        x1 = self.norm1(x).transpose(1, 2).view(B, self.embed_dims[0], H, W)
        outs.append(x1)

        # Stage 2
        x, H, W = self.patch_embed2(x1)
        for blk in self.block2:
            x = blk(x, H, W)
        x2 = self.norm2(x).transpose(1, 2).view(B, self.embed_dims[1], H, W)
        outs.append(x2)

        # Stage 3
        x, H, W = self.patch_embed3(x2)
        for blk in self.block3:
            x = blk(x, H, W)
        x3 = self.norm3(x).transpose(1, 2).view(B, self.embed_dims[2], H, W)
        outs.append(x3)

        # Stage 4
        x, H, W = self.patch_embed4(x3)
        for blk in self.block4:
            x = blk(x, H, W)
        x4 = self.norm4(x).transpose(1, 2).view(B, self.embed_dims[3], H, W)
        outs.append(x4)

        return outs


class MultiScaleDifferenceDecoder(nn.Module):
    """
    Computes absolute difference at each scale and fuses multi-scale
    representations to predict the 2-class change mask.
    """
    def __init__(
        self,
        embed_dims: Tuple[int, ...] = (64, 128, 320, 512),
        decoder_dim: int = 256,
        num_classes: int = 2,
        dropout: float = 0.1,
    ):
        super().__init__()
        self.linear_c4 = nn.Conv2d(embed_dims[3], decoder_dim, 1)
        self.linear_c3 = nn.Conv2d(embed_dims[2], decoder_dim, 1)
        self.linear_c2 = nn.Conv2d(embed_dims[1], decoder_dim, 1)
        self.linear_c1 = nn.Conv2d(embed_dims[0], decoder_dim, 1)

        self.fuse_conv = nn.Sequential(
            nn.Conv2d(decoder_dim * 4, decoder_dim, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(decoder_dim),
            nn.GELU(),
            nn.Dropout2d(dropout),
        )

        self.classifier = nn.Conv2d(decoder_dim, num_classes, kernel_size=1)

    def forward(self, feats_t0: List[torch.Tensor], feats_t1: List[torch.Tensor], target_shape: Tuple[int, int]) -> torch.Tensor:
        # Multi-scale absolute feature difference
        diff1 = torch.abs(feats_t0[0] - feats_t1[0])
        diff2 = torch.abs(feats_t0[1] - feats_t1[1])
        diff3 = torch.abs(feats_t0[2] - feats_t1[2])
        diff4 = torch.abs(feats_t0[3] - feats_t1[3])

        h1, w1 = diff1.shape[2:]

        # Project and upsample all stages to stage-1 scale (1/4 resolution)
        _c4 = self.linear_c4(diff4)
        _c4 = F.interpolate(_c4, size=(h1, w1), mode="bilinear", align_corners=False)

        _c3 = self.linear_c3(diff3)
        _c3 = F.interpolate(_c3, size=(h1, w1), mode="bilinear", align_corners=False)

        _c2 = self.linear_c2(diff2)
        _c2 = F.interpolate(_c2, size=(h1, w1), mode="bilinear", align_corners=False)

        _c1 = self.linear_c1(diff1)

        # Fuse 4 scales
        fused = self.fuse_conv(torch.cat([_c1, _c2, _c3, _c4], dim=1))
        logits = self.classifier(fused)

        # Upsample back to original image resolution
        logits = F.interpolate(logits, size=target_shape, mode="bilinear", align_corners=False)
        return logits


class ChangeFormer(nn.Module):
    """
    ChangeFormer — Complete Siamese Transformer Model for Bi-Temporal Change Detection.
    """
    def __init__(
        self,
        in_chans: int = 3,
        num_classes: int = 2,
        embed_dims: Tuple[int, ...] = (64, 128, 320, 512),
        decoder_dim: int = 256,
        depths: Tuple[int, ...] = (2, 2, 2, 2),
    ):
        super().__init__()
        self.encoder = SiameseTransformerEncoder(
            in_chans=in_chans,
            embed_dims=embed_dims,
            depths=depths,
        )
        self.decoder = MultiScaleDifferenceDecoder(
            embed_dims=embed_dims,
            decoder_dim=decoder_dim,
            num_classes=num_classes,
        )

    def forward(self, img_t0: torch.Tensor, img_t1: torch.Tensor) -> torch.Tensor:
        """
        Forward pass for bi-temporal image pair.
        Args:
          img_t0: (B, C, H, W) normalized tensor
          img_t1: (B, C, H, W) normalized tensor
        Returns:
          logits: (B, num_classes, H, W)
        """
        target_shape = img_t0.shape[2:]
        feats_t0 = self.encoder(img_t0)
        feats_t1 = self.encoder(img_t1)
        logits = self.decoder(feats_t0, feats_t1, target_shape=target_shape)
        return logits
