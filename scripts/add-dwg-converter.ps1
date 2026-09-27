# Pins private @mlightcad/dwg-converter from GitHub Packages without
# --registry (which would re-resolve public deps against npm.pkg.github.com).
#
# Usage (PowerShell):
#   $env:GITHUB_TOKEN = "ghp_..."   # PAT with read:packages
#   .\scripts\add-dwg-converter.ps1
#   .\scripts\add-dwg-converter.ps1 -Version 1.15.0

param(
  [string]$Version = '1.15.0'
)

$ErrorActionPreference = 'Stop'

if (-not $env:GITHUB_TOKEN) {
  Write-Error 'Set $env:GITHUB_TOKEN to a PAT with read:packages first.'
}

$prefix = $env:GITHUB_TOKEN.Substring(0, [Math]::Min(4, $env:GITHUB_TOKEN.Length))
if ($prefix -eq 'gho_') {
  Write-Error 'GITHUB_TOKEN looks like a GitHub CLI OAuth token (gho_). Use a classic PAT (ghp_) with read:packages.'
}

Write-Host "Resolving @mlightcad/dwg-converter@$Version tarball from npm.pkg.github.com ..."
$tarball = npm view "@mlightcad/dwg-converter@$Version" dist.tarball --registry https://npm.pkg.github.com
if (-not $tarball -or $tarball -notmatch '^https://') {
  Write-Error "Could not resolve tarball URL. npm said: $tarball"
}

Write-Host "Adding via tarball (default registry stays npmjs): $tarball"
pnpm add "@mlightcad/dwg-converter@$tarball"

Write-Host 'Done. package.json should show a version; lockfile pins the GitHub tarball.'
