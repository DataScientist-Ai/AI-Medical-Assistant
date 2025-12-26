@echo off
title ENT AI Chatbot - Backend Server
color 0B

echo.
echo ========================================
echo   🤖 Starting AI Backend Server
echo ========================================
echo.

REM Check if .env exists and has API key
findstr /C:"GEMINI_API_KEY=AIza" .env >nul 2>&1
if errorlevel 1 (
    echo ⚠️  WARNING: API key not configured!
    echo.
    echo Please edit .env file and add your Gemini API key.
    echo Get your free key at: https://makersuite.google.com/app/apikey
    echo.
    echo The server will start, but AI features won't work until
    echo you configure the API key and restart.
    echo.
    pause
)

echo ✅ Starting server on http://localhost:3000
echo.
echo 📍 Open your browser to: http://localhost:3000
echo 🔧 Press Ctrl+C to stop the server
echo.
echo Server logs:
echo ========================================
echo.

node server.js
