@echo off
echo ============================================================
echo   PUSHING UNIFIED WISTERIA TRUST MONOREPO TO GITHUB
echo ============================================================
echo.
cd /d "%~dp0"
git push --force -u origin main
echo.
echo ============================================================
echo   PUSH COMPLETED SUCCESSFULLY!
echo ============================================================
pause
