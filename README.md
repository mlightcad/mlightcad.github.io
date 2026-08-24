# MLightCAD Homepage

Brand site for [MLightCAD](https://github.com/mlightcad), featuring [cad-viewer](https://github.com/mlightcad/cad-viewer).

## Develop

```bash
pnpm install
cp .env.example .env   # fill VITE_PADDLE_* (client token + price ids)
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

## Paddle Billing (DWG Parser purchases)

Checkout uses [Paddle.js](https://developer.paddle.com/paddlejs/overview) overlay on `dwg-parser.html`. Webhooks land on a **Supabase Edge Function** (GitHub Pages cannot host them).

### Two Supabase projects (sandbox vs live)

Use **one Supabase project per Paddle environment**. Function name and secret **names** stay the same; only the **values** and project ref differ.

| | Sandbox project | Live project |
|--|-----------------|--------------|
| Paddle | Sandbox vendor dashboard | Live vendor dashboard |
| Frontend | `VITE_PADDLE_ENV=sandbox` + sandbox token / `pri_…` | `VITE_PADDLE_ENV=production` + live token / `pri_…` |
| Secrets | sandbox API key + webhook secret + sandbox price ids | live API key + webhook secret + live price ids |
| Notification URL | `https://<sandbox-ref>.supabase.co/functions/v1/paddle-webhook` | `https://<live-ref>.supabase.co/functions/v1/paddle-webhook` |

Same Edge Function (`paddle-webhook`), same secret names in both projects:

- `PADDLE_API_KEY`
- `PADDLE_WEBHOOK_SECRET`
- `PADDLE_ENV` — `sandbox` or `production`
- `PADDLE_PRICE_PERPETUAL` / `PADDLE_PRICE_ANNUAL` — that environment’s price ids

### Frontend env

| Variable | Purpose |
|----------|---------|
| `VITE_PADDLE_ENV` | `sandbox` or `production` |
| `VITE_PADDLE_CLIENT_TOKEN` | Client-side token for that environment |
| `VITE_PADDLE_PRICE_PERPETUAL` | Perpetual license price id |
| `VITE_PADDLE_PRICE_ANNUAL` | Annual updates price id |

Add the same keys as GitHub Actions secrets for Pages builds (production → live values).
Use `VITE_SUPABASE_PUBLISHABLE_KEY` (`sb_publishable_…`) for the browser client.

**Do not** put `PADDLE_API_KEY`, webhook secrets, or Supabase **secret** keys in `VITE_*`.

The `paddle-webhook` function uses the platform-injected `SUPABASE_SECRET_KEYS` (`default`)
when present, and falls back to legacy `SUPABASE_SERVICE_ROLE_KEY`. After creating new API
keys in the Dashboard (Settings → API Keys), redeploy the function so it picks up the new env.

### Deploy webhook to a project

```bash
npx supabase login
npx supabase link --project-ref <sandbox-or-live-ref>
npx supabase db push   # or run the SQL migration in the dashboard
npx supabase secrets set \
  PADDLE_API_KEY=… \
  PADDLE_WEBHOOK_SECRET=… \
  PADDLE_ENV=sandbox \
  PADDLE_PRICE_PERPETUAL=pri_… \
  PADDLE_PRICE_ANNUAL=pri_…
npx supabase functions deploy paddle-webhook
```

Repeat `link` + `secrets set` + `functions deploy` for the live project (with live values and `PADDLE_ENV=production`).

In each Paddle dashboard → **Developer tools → Notifications**, create a destination pointing at that project’s webhook URL. Copy the destination **Secret key** (⋯ → Edit destination), not the `ntfset_…` id.

4. Set **Checkout → Default payment link** to your site domain (localhost is fine in sandbox).

### Sandbox test card

`4242 4242 4242 4242`, any name, any future expiry, CVV `100`. Confirm the transaction under Paddle → Transactions and a `pending` row in `license_orders`.

### Fulfillment

Paid orders land in `license_orders` with `fulfillment_status=pending`. Invite the buyer to the GitHub org / send npm access, then mark the row `fulfilled`.
