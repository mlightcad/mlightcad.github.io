-- Trial license applications (no email; review in Supabase Table Editor / SQL)
create table if not exists public.trial_license_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company_name text not null,
  website text,
  country text not null,
  contact_name text not null,
  contact_email text not null,
  github_username text not null,
  product_name text not null,
  deployment_model text not null,
  use_case text not null
);

alter table public.trial_license_applications enable row level security;

-- Public site can submit applications with the anon / publishable key
create policy "Anyone can insert trial applications"
  on public.trial_license_applications
  for insert
  to anon, authenticated
  with check (true);

-- No public read; view rows in the dashboard (service role) only
