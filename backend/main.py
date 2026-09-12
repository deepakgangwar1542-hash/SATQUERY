"""
SatQuery AI — SIH26167 Backend
FastAPI application entry point.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from backend.api.routes_query import router as query_router
from backend.api.routes_report import router as report_router
from backend.api.routes_benchmark import router as benchmark_router

app = FastAPI(
    title="SatQuery AI",
    description="Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis (SIH26167)",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(query_router, prefix="/query", tags=["Query"])
app.include_router(report_router, prefix="/report", tags=["Report"])
app.include_router(benchmark_router, prefix="/benchmark", tags=["Benchmark"])


@app.get("/health")
def health():
    return {"status": "ok", "service": "SatQuery AI", "ps": "SIH26167"}
