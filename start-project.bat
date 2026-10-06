@echo off
title Smart Healthcare Portal

echo ==========================================
echo     SMART HEALTHCARE PORTAL
echo ==========================================
echo.

echo Starting Backend - Tomcat...
start "Smart Healthcare - Backend" cmd /k "set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-8.0.504.1-hotspot&& cd /d D:\Tools\apache-tomcat-9.0.122\bin&& catalina.bat run"

timeout /t 5 /nobreak >nul

echo Starting Frontend - React...
start "Smart Healthcare - Frontend" cmd /k "cd /d D:\SmartHealthcarePortal\frontend&& npm run dev"

timeout /t 5 /nobreak >nul

echo Opening Smart Healthcare Portal...
start "" http://localhost:5173/

echo.
echo Project started successfully!
exit