@echo off
echo.
echo ========================================
echo   Restarting Swastik CRM Dev Server
echo ========================================
echo.

REM Kill any running node/vite processes
echo Stopping any running dev servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Starting dev server with fresh environment...
echo.
echo IMPORTANT: After the server starts:
echo 1. Open your browser
echo 2. Press Ctrl+Shift+R (hard refresh) to clear cache
echo 3. Or open DevTools (F12) and right-click refresh button, select "Empty Cache and Hard Reload"
echo.

npm run dev

pause
