@echo off
echo ========================================
echo   FORCE RESTART - Swastik CRM
echo ========================================
echo.

echo Step 1: Killing ALL Node processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM npm.cmd 2>nul
timeout /t 3 /nobreak >nul

echo.
echo Step 2: Clearing npm cache...
npm cache clean --force

echo.
echo Step 3: Deleting node_modules/.vite cache...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo Cache deleted!
) else (
    echo No cache found.
)

echo.
echo Step 4: Starting fresh dev server...
echo.
echo ========================================
echo   IMPORTANT: After server starts
echo ========================================
echo 1. Open browser in INCOGNITO/PRIVATE mode
echo 2. Or press Ctrl+Shift+Delete to clear ALL browser data
echo 3. Then visit: http://localhost:5173
echo ========================================
echo.

npm run dev

pause
