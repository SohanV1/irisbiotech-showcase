@echo off
title Iris Biotech - Local Server
echo ====================================================
echo Starting Iris Biotech Local Server...
echo ====================================================
echo.
echo Server URL: http://localhost:5173/map-animation
echo Opening browser...
start http://localhost:5173/map-animation
npm run dev -- --host 0.0.0.0 --port 5173
