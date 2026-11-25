@echo off
title FindIt - Local Server
cd /d "%~dp0"

echo Starting FindIt at http://localhost:8000
echo Keep this window open while using the website.
echo Press Ctrl+C to stop the server.
echo.

where py >nul 2>nul
if %errorlevel%==0 (
    start "" "http://localhost:8000"
    py -m http.server 8000
) else (
    where python >nul 2>nul
    if %errorlevel%==0 (
        start "" "http://localhost:8000"
        python -m http.server 8000
    ) else (
        echo Python was not found.
        echo Install Python from https://www.python.org/downloads/
        echo During installation, enable "Add Python to PATH".
        pause
    )
)
