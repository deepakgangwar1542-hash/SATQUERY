"""
Segmentation Cache — SatQuery AI.

Caches segmentation inference by (image_hash, prompt_hash, model_version)
to eliminate redundant segmentation passes on repeated or multi-step queries.
"""
from __future__ import annotations
import hashlib
from typing import Any, Dict, Optional, Tuple
import numpy as np


class SegmentationCache:
    def __init__(self, max_size: int = 128):
        self._max_size = max_size
        self._cache: Dict[str, Any] = {}
        self._access_order: list[str] = []

    def _hash_key(self, image_arr: np.ndarray, prompt_key: str, model_id: str) -> str:
        # Fast perceptual/sample hash for image array
        h = hashlib.sha256()
        h.update(str(image_arr.shape).encode())
        h.update(str(image_arr.dtype).encode())
        # Sample corners and center for speed without hashing full megabyte array
        sample = image_arr[::max(1, image_arr.shape[0] // 8), ::max(1, image_arr.shape[1] // 8)].tobytes()
        h.update(sample[:4096])
        h.update(prompt_key.encode())
        h.update(model_id.encode())
        return h.hexdigest()

    def get(self, image_arr: np.ndarray, prompt_key: str, model_id: str) -> Optional[Any]:
        k = self._hash_key(image_arr, prompt_key, model_id)
        if k in self._cache:
            if k in self._access_order:
                self._access_order.remove(k)
            self._access_order.append(k)
            return self._cache[k]
        return None

    def put(self, image_arr: np.ndarray, prompt_key: str, model_id: str, result: Any) -> None:
        k = self._hash_key(image_arr, prompt_key, model_id)
        if len(self._cache) >= self._max_size and self._access_order:
            oldest = self._access_order.pop(0)
            self._cache.pop(oldest, None)
        self._cache[k] = result
        self._access_order.append(k)

    def clear(self) -> None:
        self._cache.clear()
        self._access_order.clear()


_GLOBAL_CACHE = SegmentationCache()


def get_segmentation_cache() -> SegmentationCache:
    return _GLOBAL_CACHE
