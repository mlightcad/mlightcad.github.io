#!/usr/bin/env node
/**
 * Link the Supabase CLI to mlightcad-dev or mlightcad-prod using .env.dev / .env.prod.
 *
 * Usage:
 *   node scripts/supabase-env.mjs dev
 *   node scripts/supabase-env.mjs prod
 *   node scripts/supabase-env.mjs dev db push --yes
 *   node scripts/supabase-env.mjs prod functions deploy notify-new-orders
 *   node scripts/supabase-env.mjs prod secrets set CRON_SECRET=...
 *   node scripts/supabase-env.mjs dev db query --linked -f supabase/cron/notify-new-orders.sql
 *   node scripts/supabase-env.mjs prod invoke-cron
 *
 * Or via pnpm:
 *   pnpm supabase:dev
 *   pnpm supabase:prod -- functions deploy notify-new-orders
 */

import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** @param {string} path */
function readDotEnv(path) {
  /** @type {Record<string, string>} */
  const map = {}
  for (const raw of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq < 1) continue
    const key = line.slice(0, eq).trim()
    let val = line.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    map[key] = val
  }
  return map
}

/**
 * @param {string} arg
 */
function quoteArg(arg) {
  if (/^[A-Za-z0-9_@%+=:,./-]+$/.test(arg)) return arg
  return `"${arg.replace(/"/g, '\\"')}"`
}

/**
 * @param {string} command
 * @param {string[]} args
 */
function run(command, args) {
  /** @type {import('node:child_process').SpawnSyncReturns<Buffer>} */
  let result
  if (process.platform === 'win32') {
    // .cmd shims need a shell; pass one command string to avoid DEP0190.
    const line = [command, ...args].map(quoteArg).join(' ')
    result = spawnSync(line, { cwd: root, stdio: 'inherit', shell: true, env: process.env })
  } else {
    result = spawnSync(command, args, { cwd: root, stdio: 'inherit', env: process.env })
  }
  if (result.error) throw result.error
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

async function main() {
  const [envName, ...rest] = process.argv.slice(2)
  if (envName !== 'dev' && envName !== 'prod') {
    console.error('Usage: node scripts/supabase-env.mjs <dev|prod> [supabase args...]')
    process.exit(1)
  }

  const envFile = join(root, `.env.${envName}`)
  if (!existsSync(envFile)) {
    console.error(`Missing ${envFile}`)
    process.exit(1)
  }

  const vars = readDotEnv(envFile)
  const ref = vars.SUPABASE_PROJECT_REF
  const url = vars.VITE_SUPABASE_URL
  const cron = vars.CRON_SECRET

  if (!ref) {
    console.error(`SUPABASE_PROJECT_REF missing in ${envFile}`)
    process.exit(1)
  }
  if (!url) {
    console.error(`VITE_SUPABASE_URL missing in ${envFile}`)
    process.exit(1)
  }

  console.log(`Linking Supabase CLI -> ${envName} (${ref})`)
  run('npx', ['--yes', 'supabase', 'link', '--project-ref', ref, '--yes'])

  console.log('')
  console.log('Linked:')
  console.log(`  env          ${envName}`)
  console.log(`  project_ref  ${ref}`)
  console.log(`  project_url  ${url}`)
  console.log(cron ? `  CRON_SECRET  ${cron}` : `  CRON_SECRET  (not set in ${envFile})`)
  console.log('')

  if (rest.length === 0) return

  if (rest.length === 1 && rest[0] === 'invoke-cron') {
    if (!cron) {
      console.error(`CRON_SECRET missing in ${envFile} (needed for invoke-cron)`)
      process.exit(1)
    }
    const endpoint = `${url.replace(/\/$/, '')}/functions/v1/notify-new-orders`
    console.log(`POST ${endpoint}`)
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cron}` },
    })
    const body = await res.text()
    console.log(body)
    if (!res.ok) process.exit(1)
    return
  }

  console.log(`Running: npx supabase ${rest.join(' ')}`)
  run('npx', ['--yes', 'supabase', ...rest])
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
