@echo off
title ENT AI Chatbot Server
color 0A

echo.
echo ========================================
echo    🏥 ENT AI Medical Chatbot
echo ========================================
echo.
echo Starting server...
echo.

REM Check if .env exists
if not exist .env (
    echo ❌ ERROR: .env file not found!
    echo.
    echo Please run setup.bat first to configure your API key.
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist node_modules (
    echo ⚠️  Dependencies not installed. Installing now...
    echo.
    call npm install
    echo.
)

REM Start the server
echo ✅ Starting ENT AI Chatbot Server...
echo.
echo 📍 Server will be available at: http://localhost:3000
echo 🔧 Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

npm start
