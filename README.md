# MLightCAD Homepage

Brand site for [MLightCAD](https://github.com/mlightcad), featuring [cad-viewer](https://github.com/mlightcad/cad-viewer).

## Develop

```bash
# Private @mlightcad/dwg-converter is on GitHub Packages (mlightcad org).
# Public @mlightcad/* packages still come from npmjs — do not point the whole
# @mlightcad scope at npm.pkg.github.com (see .npmrc).
export GITHUB_TOKEN=ghp_xxx   # PAT with read:packages (Windows: $env:GITHUB_TOKEN=...)
pnpm install
# First-time / after publish: pin the private tarball into the lockfile
# pnpm add @mlightcad/dwg-converter@1.14.14 --registry https://npm.pkg.github.com
cp .env.example .env   # fill VITE_PADDLE_* (+ VITE_SUPABASE_* for license portal)
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

Deployed to GitHub Pages at https://mlightcad.github.io/ via `.github/workflows/deploy.yml`.

## Trial license

The DWG Parser **Apply for Trial License** button currently opens mail to `support@mlightcad.com`.

The previous in-page form (`src/trial-license.ts`) and table migration
(`supabase/migrations/20260731120000_trial_license_applications.sql`) are kept in the
repo so submissions can be switched back to Supabase later. To re-enable: wire
`ensureTrialDialog` / `bindTrialTriggers` in `src/parser-page.ts`, set
`VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`, and apply that migration.

## Commercial fulfillment (Paddle → License Key + GitHub Packages)

Checkout uses [Paddle.js](https://developer.paddle.com/paddlejs/overview) on `dwg-engine.html`.
Webhooks run on **Supabase Edge Functions** (GitHub Pages cannot host them).

```text
Paddle payment
  → paddle-webhook
  → issue offline License JWT (RS256)
  → email buyer (Resend)
  → (manual) grant GitHub Packages access to their GitHub account
  → buyer installs from npm.pkg.github.com
```

| Function | Purpose |
|----------|---------|
| `paddle-webhook` | Verify Paddle events, auto-issue license JWT + email |
| `license-portal` | Magic-link API for viewing license keys |

Buyer portal page: [`license-portal.html`](https://mlightcad.com/license-portal.html).

Package download access is **not** automated here — grant it in GitHub (org/repo/package permission) using the buyer’s GitHub username. Support is notified after each paid order so you can invite them.

### Two Supabase projects (sandbox vs live)

Use **one Supabase project per Paddle environment**. Function names and secret **names** stay the same; only the **values** and project ref differ.

| | Sandbox project | Live project |
|--|-----------------|--------------|
| Paddle | Sandbox vendor dashboard | Live vendor dashboard |
| Frontend | `VITE_PADDLE_ENV=sandbox` + sandbox token / `pri_…` | `VITE_PADDLE_ENV=production` + live token / `pri_…` |
| Secrets | sandbox values | live values |
| Notification URL | `https://<sandbox-ref>.supabase.co/functions/v1/paddle-webhook` | `https://<live-ref>.supabase.co/functions/v1/paddle-webhook` |

### Edge Function secrets

```bash
npx supabase secrets set \
  PADDLE_API_KEY=… \
  PADDLE_WEBHOOK_SECRET=… \
  PADDLE_ENV=sandbox \
  PADDLE_PRICE_PERPETUAL=pri_… \
  PADDLE_PRICE_ANNUAL=pri_… \
  DWG_LICENSE_PRIVATE_KEY="$(cat path/to/private.pem | sed 's/$/\\n/' | tr -d '\n')" \
  RESEND_API_KEY=re_… \
  RESEND_FROM_EMAIL='MLightCAD Licenses <licenses@mlightcad.com>' \
  LICENSE_PORTAL_BASE_URL=https://mlightcad.com/license-portal.html \
  SUPPORT_NOTIFY_EMAIL=support@mlightcad.com
```

| Secret | Purpose |
|--------|---------|
| `DWG_LICENSE_PRIVATE_KEY` | PKCS#8 PEM matching the public key embedded in `@mlightcad/dwg-converter` |
| `RESEND_API_KEY` | Sends license email (and support notify) |
| `LICENSE_PORTAL_BASE_URL` | Magic-link target for the portal |

`DWG_LICENSE_PRIVATE_KEY` may use literal `\n` escapes for newlines.

### Frontend env

| Variable | Purpose |
|----------|---------|
| `VITE_PADDLE_ENV` | `sandbox` or `production` |
| `VITE_PADDLE_CLIENT_TOKEN` | Client-side token for that environment |
| `VITE_PADDLE_PRICE_PERPETUAL` | Perpetual license price id |
| `VITE_PADDLE_PRICE_ANNUAL` | Annual updates price id |
| `VITE_SUPABASE_URL` | Project URL (license portal) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable key (`sb_publishable_…`) |

**Do not** put `PADDLE_API_KEY`, webhook secrets, or `DWG_LICENSE_PRIVATE_KEY` in `VITE_*`.

### Deploy

```bash
npx supabase login
npx supabase link --project-ref <sandbox-or-live-ref>
npx supabase db push
npx supabase secrets set …   # see table above
npx supabase functions deploy paddle-webhook
npx supabase functions deploy license-portal
```

If you previously deployed `package-proxy`, you can ignore/delete that function in the Supabase dashboard — it is no longer in this repo.

In each Paddle dashboard → **Developer tools → Notifications**, point at that project’s
`paddle-webhook` URL. Copy the destination **Secret key** (⋯ → Edit destination), not the `ntfset_…` id.

Set **Checkout → Default payment link** to your site domain (localhost is fine in sandbox).

### Sandbox test card

`4242 4242 4242 4242`, any name, any future expiry, CVV `100`.

Expect:

1. `license_orders.fulfillment_status = fulfilled`
2. A row in `licenses`
3. Buyer email from Resend with the offline JWT + GitHub Packages install notes
4. Support notify email reminding you to grant GitHub Packages access
5. After you invite their GitHub account:

```bash
# .npmrc
registry=https://registry.npmjs.org/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

pnpm add @mlightcad/dwg-converter --registry https://npm.pkg.github.com
```

### License portal

1. Open `/license-portal.html`
2. Enter purchase email → magic link
3. View / copy the offline license key and GitHub Packages install snippet

### Customer install notes

- Keep public `@mlightcad/*` packages on npmjs (default registry).
- Install the private converter from GitHub Packages after org/package access is granted.
- Pass the offline JWT into `AcDbDwgConverter({ licenseKey })`.
