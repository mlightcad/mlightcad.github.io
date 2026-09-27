#!/usr/bin/env bash
# Pins private @mlightcad/dwg-converter from GitHub Packages without
# --registry (which would re-resolve public deps against npm.pkg.github.com).
#
# Usage (bash):
#   export GITHUB_TOKEN=ghp_...   # PAT with read:packages
#   ./scripts/add-dwg-converter.sh
#   ./scripts/add-dwg-converter.sh 1.15.0

set -euo pipefail

VERSION="${1:-1.15.0}"

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "error: Set GITHUB_TOKEN to a PAT with read:packages first." >&2
  exit 1
fi

prefix="${GITHUB_TOKEN:0:4}"
if [[ "$prefix" == "gho_" ]]; then
  echo "error: GITHUB_TOKEN looks like a GitHub CLI OAuth token (gho_). Use a classic PAT (ghp_) with read:packages." >&2
  exit 1
fi

echo "Resolving @mlightcad/dwg-converter@${VERSION} tarball from npm.pkg.github.com ..."
tarball="$(npm view "@mlightcad/dwg-converter@${VERSION}" dist.tarball --registry https://npm.pkg.github.com)"
if [[ -z "$tarball" || "$tarball" != https://* ]]; then
  echo "error: Could not resolve tarball URL. npm said: ${tarball}" >&2
  exit 1
fi

echo "Adding via tarball (default registry stays npmjs): ${tarball}"
pnpm add "@mlightcad/dwg-converter@${tarball}"

echo "Done. package.json should show a version; lockfile pins the GitHub tarball."
