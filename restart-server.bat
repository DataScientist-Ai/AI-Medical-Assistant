@echo off
echo ========================================
echo   Stopping existing server...
echo ========================================
echo.

REM Kill any existing node processes on port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Stopping process %%a...
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ✅ Port 3000 is now available
echo.
timeout /t 2 /nobreak >nul

REM Start the server
call start-server.bat
