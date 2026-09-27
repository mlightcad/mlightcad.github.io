@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM Pins private @mlightcad/dwg-converter from GitHub Packages without
REM --registry (which would re-resolve public deps against npm.pkg.github.com).
REM
REM Usage (cmd.exe):
REM   set GITHUB_TOKEN=ghp_...
REM   scripts\add-dwg-converter.cmd
REM   scripts\add-dwg-converter.cmd 1.15.0

set "VERSION=%~1"
if "%VERSION%"=="" set "VERSION=1.15.0"

if not defined GITHUB_TOKEN (
  echo error: Set GITHUB_TOKEN to a PAT with read:packages first. 1>&2
  exit /b 1
)

set "PREFIX=!GITHUB_TOKEN:~0,4!"
if /I "!PREFIX!"=="gho_" (
  echo error: GITHUB_TOKEN looks like a GitHub CLI OAuth token ^(gho_^). Use a classic PAT ^(ghp_^) with read:packages. 1>&2
  exit /b 1
)

echo Resolving @mlightcad/dwg-converter@%VERSION% tarball from npm.pkg.github.com ...
for /f "usebackq delims=" %%U in (`npm view "@mlightcad/dwg-converter@%VERSION%" dist.tarball --registry https://npm.pkg.github.com`) do set "TARBALL=%%U"

if not defined TARBALL (
  echo error: Could not resolve tarball URL. 1>&2
  exit /b 1
)
echo !TARBALL! | findstr /B /I "https://" >nul
if errorlevel 1 (
  echo error: Could not resolve tarball URL. npm said: !TARBALL! 1>&2
  exit /b 1
)

echo Adding via tarball ^(default registry stays npmjs^): !TARBALL!
call pnpm add "@mlightcad/dwg-converter@!TARBALL!"
if errorlevel 1 exit /b 1

echo Done. package.json should show a version; lockfile pins the GitHub tarball.
exit /b 0
