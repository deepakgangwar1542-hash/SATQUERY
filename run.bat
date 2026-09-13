@echo off
title SatQuery AI Launcher
echo ==============================================
echo       Starting SatQuery AI Services...
echo ==============================================

echo [1/2] Starting FastAPI Backend on port 8000...
start "SatQuery Backend" cmd /k "python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 2 /nobreak >nul

echo [2/2] Starting React + Vite Frontend on port 5173...
start "SatQuery Frontend" cmd /k "cd frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo Opening browser...
start http://localhost:5173

echo ==============================================
echo SatQuery AI is running!
echo Frontend: http://localhost:5173
echo Backend:  http://127.0.0.1:8000/docs
echo ==============================================
pause
