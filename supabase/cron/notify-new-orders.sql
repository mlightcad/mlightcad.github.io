-- Schedule (or re-schedule) the daily Paddle order support-notify job.
-- Run once per Supabase project after Vault secrets exist:
--
--   select vault.create_secret('https://<project-ref>.supabase.co', 'project_url');
--   select vault.create_secret('<same value as CRON_SECRET>', 'cron_secret');
--
-- Then: npx supabase db query -f supabase/cron/notify-new-orders.sql
-- (or paste into the SQL editor)

create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

do $$
declare
  jid bigint;
begin
  if not exists (select 1 from vault.decrypted_secrets where name = 'project_url') then
    raise exception 'Missing Vault secret project_url';
  end if;
  if not exists (select 1 from vault.decrypted_secrets where name = 'cron_secret') then
    raise exception 'Missing Vault secret cron_secret';
  end if;

  select jobid into jid from cron.job where jobname = 'notify-new-orders-daily';
  if jid is not null then
    perform cron.unschedule(jid);
  end if;

  -- 01:00 UTC = 09:00 Asia/Shanghai
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
end $$;
