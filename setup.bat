@echo off
echo ========================================
echo   AI Medical Assistant - Setup Script
echo ========================================
echo.

REM Check if .env exists
if exist .env (
    echo .env file already exists!
    echo.
    set /p overwrite="Do you want to overwrite it? (y/n): "
    if /i not "%overwrite%"=="y" (
        echo Setup cancelled.
        pause
        exit /b
    )
)

echo.
echo Creating .env file...
(
echo # Google Gemini API Key
echo # Get your free API key from: https://makersuite.google.com/app/apikey
echo GEMINI_API_KEY=
echo.
echo # Server Configuration
echo PORT=3000
) > .env

echo .env file created successfully!
echo.
echo ========================================
echo   IMPORTANT: Configure your API Key
echo ========================================
echo.
echo 1. Get your API Keys (Gemini, Groq, xAI, etc.)
echo.
echo 2. Run the application and Add your keys in the Settings (⚙️) menu.
echo    Your keys are stored only in your local browser.
echo.
echo 4. Save the file
echo.
echo ========================================
echo.
set /p open="Would you like to open .env file now? (y/n): "
if /i "%open%"=="y" (
    notepad .env
)

echo.
echo Setup complete! Next steps:
echo 1. Configure your API key in .env
echo 2. Run: npm start
echo 3. Open: http://localhost:3000
echo.
pause
