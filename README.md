# MLightCAD Homepage

Brand site for [MLightCAD](https://github.com/mlightcad), featuring [cad-viewer](https://github.com/mlightcad/cad-viewer).

## Develop

```bash
npm install
cp .env.example .env   # then fill in Supabase keys (needed for trial form)
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Deployed to GitHub Pages at https://mlightcad.github.io/ via `.github/workflows/deploy.yml`.

## Trial license form (Supabase)

The DWG Parser page includes an **Apply for Trial License** dialog. Submissions are stored in the `trial_license_applications` table (no email yet).

### 1. Frontend env

Copy `.env.example` to `.env` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

For GitHub Pages, add the same values as repository secrets (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

### 2. Create the table

In the Supabase SQL Editor, run `supabase/migrations/20260731120000_trial_license_applications.sql`, or:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Review applications under **Table Editor → trial_license_applications**.
