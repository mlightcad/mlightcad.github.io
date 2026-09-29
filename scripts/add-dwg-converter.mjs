#!/usr/bin/env node
/**
 * Pins private @mlightcad/dwg-converter from GitHub Packages without
 * --registry (which would re-resolve public deps against npm.pkg.github.com).
 *
 * Usage:
 *   GITHUB_TOKEN=ghp_... pnpm add-dwg-converter
 *   GITHUB_TOKEN=ghp_... pnpm add-dwg-converter 1.15.0
 *
 * Windows (PowerShell):
 *   $env:GITHUB_TOKEN = "ghp_..."
 *   pnpm add-dwg-converter
 *   pnpm add-dwg-converter 1.15.0
 */

import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/**
 * @param {string} arg
 */
function quoteArg(arg) {
  // cmd.exe expands % even inside quotes, and \" is not a quote escape.
  if (/^[^"&|<>^%!()\\\s]+$/.test(arg)) return arg
  return `"${arg.replaceAll('%', '%%').replaceAll('"', '""')}"`
}

/**
 * @param {string} command
 * @param {string[]} args
 * @param {{ capture?: boolean }} [options]
 */
function run(command, args, options = {}) {
  const capture = options.capture === true
  /** @type {import('node:child_process').SpawnSyncOptions} */
  const spawnOptions = {
    cwd: root,
    env: process.env,
    encoding: 'utf8',
    stdio: capture ? ['inherit', 'pipe', 'inherit'] : 'inherit',
  }

  /** @type {import('node:child_process').SpawnSyncReturns<string>} */
  let result
  if (process.platform === 'win32') {
    // .cmd shims need a shell; pass one command string to avoid DEP0190.
    const line = [command, ...args].map(quoteArg).join(' ')
    result = spawnSync(line, { ...spawnOptions, shell: true })
  } else {
    result = spawnSync(command, args, spawnOptions)
  }

  if (result.error) throw result.error
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
  return (result.stdout ?? '').trim()
}

function main() {
  const version = process.argv[2] || '1.15.0'
  const token = process.env.GITHUB_TOKEN ?? ''

  if (!token) {
    console.error('error: Set GITHUB_TOKEN to a PAT with read:packages first.')
    process.exit(1)
  }

  if (token.startsWith('gho_')) {
    console.error(
      'error: GITHUB_TOKEN looks like a GitHub CLI OAuth token (gho_). Use a classic PAT (ghp_) with read:packages.',
    )
    process.exit(1)
  }

  console.log(
    `Resolving @mlightcad/dwg-converter@${version} tarball from npm.pkg.github.com ...`,
  )
  const output = run(
    'npm',
    [
      'view',
      `@mlightcad/dwg-converter@${version}`,
      'dist.tarball',
      '--registry',
      'https://npm.pkg.github.com',
    ],
    { capture: true },
  )
  const tarball = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith('https://'))

  if (!tarball) {
    console.error(`error: Could not resolve tarball URL. npm said: ${output}`)
    process.exit(1)
  }

  console.log(`Adding via tarball (default registry stays npmjs): ${tarball}`)
  run('pnpm', ['add', `@mlightcad/dwg-converter@${tarball}`])

  console.log('Done. package.json should show a version; lockfile pins the GitHub tarball.')
}

main()
