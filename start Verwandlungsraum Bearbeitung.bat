@echo off
chcp 65001 >nul

REM Wechsle ins Skriptverzeichnis
cd /d %~dp0

echo Starte Vorbereitung für die Arbeit an deiner Webseite...

REM Prüfe, ob git installiert ist
where git >nul 2>nul
if errorlevel 1 (
    echo Git ist nicht installiert. Bitte installiere Git, bevor du fortfaehrst.
    pause
    exit /b 1
)

REM Prüfe, ob das Verzeichnis ein Git-Repository ist
if not exist .git (
    echo Kein Git-Repository gefunden. Initialisiere...
    git init
    git remote add origin https://github.com/MaxWindt/v0-verwandlungsraum.git
)

REM Hole die neuesten Änderungen
echo Hole die neuesten Änderungen vom Remote-Repository...
git pull origin main

REM Starte Copilot CLI, falls installiert
where copilot >nul 2>nul
if errorlevel 1 (
    echo Copilot CLI ist nicht installiert. Folge der Anleitung auf https://github.com/github/copilot-cli, um es zu installieren.
) else (
    echo Starte Copilot CLI...
    start cmd /k "copilot"
)

echo Vorbereitung abgeschlossen. Du kannst jetzt loslegen!
pause
