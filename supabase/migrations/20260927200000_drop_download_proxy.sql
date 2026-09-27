-- Remove download-token / package-proxy tables if an earlier revision created them.
drop table if exists public.download_events;
drop table if exists public.download_tokens;
