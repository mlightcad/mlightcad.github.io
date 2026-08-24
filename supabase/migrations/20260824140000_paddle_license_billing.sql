-- Paddle Billing: customers, one-time orders, and annual-update subscriptions

create table if not exists public.paddle_customers (
  id bigint generated always as identity primary key,
  paddle_customer_id text not null unique,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.paddle_webhook_events (
  event_id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now()
);

create table if not exists public.license_orders (
  id bigint generated always as identity primary key,
  paddle_transaction_id text not null unique,
  paddle_event_id text not null unique,
  paddle_customer_id text references public.paddle_customers (paddle_customer_id),
  email text,
  status text not null,
  price_id text,
  product_type text not null check (product_type in ('perpetual', 'annual', 'unknown')),
  amount_total text,
  currency text,
  custom_data jsonb,
  fulfillment_status text not null default 'pending'
    check (fulfillment_status in ('pending', 'fulfilled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.license_subscriptions (
  id bigint generated always as identity primary key,
  paddle_subscription_id text not null unique,
  paddle_customer_id text references public.paddle_customers (paddle_customer_id),
  email text,
  price_id text,
  status text not null,
  current_period_end timestamptz,
  custom_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists license_orders_fulfillment_idx
  on public.license_orders (fulfillment_status);

create index if not exists license_subscriptions_status_idx
  on public.license_subscriptions (status);

alter table public.paddle_customers enable row level security;
alter table public.paddle_webhook_events enable row level security;
alter table public.license_orders enable row level security;
alter table public.license_subscriptions enable row level security;

-- No public policies: only the service role (Edge Functions) can read/write.
