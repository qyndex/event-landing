-- Event Landing Page schema
-- Tables: registrations, speakers, schedule_items, sponsors

-- Speakers
create table if not exists public.speakers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null default '',
  company text not null default '',
  bio text not null default '',
  avatar_url text not null default '',
  talk_title text not null default '',
  talk_description text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Schedule items
create table if not exists public.schedule_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  speaker_id uuid references public.speakers(id) on delete set null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  track text not null default 'main',
  created_at timestamptz not null default now()
);

-- Sponsors
create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null default '',
  tier text not null default 'bronze',
  website text not null default '',
  sort_order int not null default 0
);

-- Registrations
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  company text not null default '',
  ticket_type text not null default 'general',
  created_at timestamptz not null default now()
);

-- RLS policies

-- Speakers: readable by anyone (public event page)
alter table public.speakers enable row level security;
create policy "Speakers are publicly readable"
  on public.speakers for select
  using (true);

-- Schedule items: readable by anyone
alter table public.schedule_items enable row level security;
create policy "Schedule items are publicly readable"
  on public.schedule_items for select
  using (true);

-- Sponsors: readable by anyone
alter table public.sponsors enable row level security;
create policy "Sponsors are publicly readable"
  on public.sponsors for select
  using (true);

-- Registrations: anyone can insert (public registration form)
alter table public.registrations enable row level security;
create policy "Anyone can register"
  on public.registrations for insert
  with check (true);

-- Indexes
create index if not exists idx_schedule_items_start_time on public.schedule_items(start_time);
create index if not exists idx_speakers_sort_order on public.speakers(sort_order);
create index if not exists idx_sponsors_sort_order on public.sponsors(sort_order);
create index if not exists idx_sponsors_tier on public.sponsors(tier);
