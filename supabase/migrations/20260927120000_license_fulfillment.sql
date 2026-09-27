-- Automatic license fulfillment: signed JWTs + portal sessions.
-- Package download access is granted via GitHub Packages (org/repo access), not a proxy.

create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  paddle_transaction_id text not null unique,
  paddle_customer_id text references public.paddle_customers (paddle_customer_id),
  email text not null,
  product text not null default '@mlightcad/dwg-converter',
  product_type text not null check (product_type in ('perpetual', 'annual', 'unknown')),
  customer_sub text not null,
  license_jwt text not null,
  expires_at timestamptz not null,
  status text not null default 'active'
    check (status in ('active', 'revoked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists licenses_email_idx on public.licenses (lower(email));
create index if not exists licenses_customer_idx
  on public.licenses (paddle_customer_id, product, status);

create table if not exists public.portal_sessions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists portal_sessions_email_idx
  on public.portal_sessions (lower(email));

alter table public.licenses enable row level security;
alter table public.portal_sessions enable row level security;

-- No public policies: Edge Functions use the secret/service role key only.

alter table public.license_orders
  drop constraint if exists license_orders_fulfillment_status_check;

alter table public.license_orders
  add constraint license_orders_fulfillment_status_check
  check (fulfillment_status in ('pending', 'fulfilled', 'failed'));
