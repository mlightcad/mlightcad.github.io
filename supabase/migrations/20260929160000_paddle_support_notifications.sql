-- Track successful support emails for Paddle orders (once-only notifications).
-- Seed existing license_orders so the first cron run does not re-notify history.

create table if not exists public.paddle_support_notifications (
  paddle_transaction_id text primary key,
  emailed_at timestamptz not null default now(),
  resend_id text,
  source text not null default 'cron'
    check (source in ('webhook', 'cron', 'manual'))
);

alter table public.paddle_support_notifications enable row level security;

insert into public.paddle_support_notifications (paddle_transaction_id, source)
select paddle_transaction_id, 'manual'
from public.license_orders
on conflict (paddle_transaction_id) do nothing;

-- pg_cron + pg_net: daily invoke of notify-new-orders Edge Function.
-- Requires Vault secrets (one-time per project), usually created after this migration:
--   select vault.create_secret('https://<project-ref>.supabase.co', 'project_url');
--   select vault.create_secret('<same value as CRON_SECRET edge secret>', 'cron_secret');
-- Extension or schedule failures must not roll back the table above.
do $$
declare
  jid bigint;
  has_url boolean := false;
  has_secret boolean := false;
begin
  begin
    create extension if not exists pg_cron with schema pg_catalog;
    create extension if not exists pg_net with schema extensions;
  exception
    when others then
      raise notice 'Could not enable pg_cron/pg_net (%). Run supabase/cron/notify-new-orders.sql later.', sqlerrm;
      return;
  end;

  begin
    select exists (
      select 1 from vault.decrypted_secrets where name = 'project_url'
    ) into has_url;
    select exists (
      select 1 from vault.decrypted_secrets where name = 'cron_secret'
    ) into has_secret;
  exception
    when others then
      raise notice 'Vault not available (%); skip cron schedule. See supabase/cron/notify-new-orders.sql', sqlerrm;
      return;
  end;

  if not (has_url and has_secret) then
    raise notice
      'Skipping cron schedule: create Vault secrets project_url and cron_secret, then run supabase/cron/notify-new-orders.sql';
    return;
  end if;

  select jobid into jid from cron.job where jobname = 'notify-new-orders-daily';
  if jid is not null then
    perform cron.unschedule(jid);
  end if;

  -- 01:00 UTC = 09:00 Asia/Shanghai. 5000ms is the pg_net cap on many projects.
  perform cron.schedule(
    'notify-new-orders-daily',
    '0 1 * * *',
    $cron$
    select net.http_post(
      url := (select decrypted_secret from vault.decrypted_secrets where name = 'project_url')
        || '/functions/v1/notify-new-orders',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || (
          select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret'
        )
      ),
      body := '{}'::jsonb,
      timeout_milliseconds := 5000
    );
    $cron$
  );
exception
  when others then
    raise notice 'Could not schedule notify-new-orders-daily (%). Run supabase/cron/notify-new-orders.sql later.', sqlerrm;
end $$;
