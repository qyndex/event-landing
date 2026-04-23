-- Seed data for DevConf 2026

-- Speakers (6)
insert into public.speakers (name, title, company, bio, avatar_url, talk_title, talk_description, sort_order) values
(
  'Dr. Maya Chen',
  'Chief AI Scientist',
  'DeepMind',
  'Dr. Maya Chen leads the foundational models team at DeepMind. Her research on emergent reasoning in large language models has been cited over 12,000 times. She previously held faculty positions at MIT and Stanford.',
  'https://api.dicebear.com/9.x/notionists/svg?seed=maya',
  'Keynote: Intelligence Beyond Imitation',
  'How the next generation of AI systems will move past pattern matching toward genuine understanding — and what that means for every developer in this room.',
  1
),
(
  'Carlos Rivera',
  'VP of Platform Engineering',
  'Stripe',
  'Carlos has spent 15 years building payment infrastructure that processes billions of transactions. He is an open-source maintainer and frequent conference speaker on distributed systems.',
  'https://api.dicebear.com/9.x/notionists/svg?seed=carlos',
  'Scaling APIs to a Billion Requests',
  'Lessons from scaling Stripe''s API gateway: rate limiting, circuit breakers, observability, and the human side of on-call.',
  2
),
(
  'Priya Sharma',
  'Staff Engineer',
  'Vercel',
  'Priya is a core contributor to Next.js and an expert on edge computing. She has shipped features used by millions of developers and speaks regularly about web performance.',
  'https://api.dicebear.com/9.x/notionists/svg?seed=priya',
  'The Edge-First Web',
  'Server components, streaming SSR, and edge functions — how the rendering model of the web is being rewritten for speed.',
  3
),
(
  'James Okafor',
  'Security Engineering Lead',
  'GitHub',
  'James led the team that built GitHub''s secret scanning and code security features. He is passionate about making security accessible to every developer, not just specialists.',
  'https://api.dicebear.com/9.x/notionists/svg?seed=james',
  'Shift Left Without the Guilt',
  'Practical DevSecOps that developers actually adopt — automated scanning, policy-as-code, and building security into the developer experience.',
  4
),
(
  'Lina Bergstrom',
  'CTO',
  'Neon',
  'Lina co-founded Neon to bring serverless Postgres to every developer. Before that she spent a decade at AWS building RDS and Aurora. She holds three patents on database replication.',
  'https://api.dicebear.com/9.x/notionists/svg?seed=lina',
  'Postgres Everywhere: Serverless, Branching, and Beyond',
  'How serverless Postgres with instant branching changes development workflows — from preview environments to schema migrations to CI.',
  5
),
(
  'David Park',
  'Developer Advocate',
  'Anthropic',
  'David helps developers build with Claude and the Anthropic API. He previously built developer tools at Google and contributed to TensorFlow. He co-authored "Production AI Systems" (O''Reilly, 2025).',
  'https://api.dicebear.com/9.x/notionists/svg?seed=david',
  'Building Reliable AI Agents',
  'Patterns for building AI agents that actually work in production — tool use, self-correction, evaluation frameworks, and knowing when to fail gracefully.',
  6
);

-- Schedule items (12 across 2 days, 2 tracks)
-- Day 1: June 15, 2026
insert into public.schedule_items (title, description, speaker_id, start_time, end_time, track) values
(
  'Registration & Welcome Coffee',
  'Pick up your badge, grab a coffee, and meet fellow attendees in the main hall.',
  null,
  '2026-06-15 08:00:00+00',
  '2026-06-15 09:00:00+00',
  'main'
),
(
  'Keynote: Intelligence Beyond Imitation',
  'Opening keynote by Dr. Maya Chen.',
  (select id from public.speakers where name = 'Dr. Maya Chen'),
  '2026-06-15 09:00:00+00',
  '2026-06-15 10:00:00+00',
  'main'
),
(
  'Scaling APIs to a Billion Requests',
  'Carlos Rivera shares hard-won lessons from Stripe''s API infrastructure.',
  (select id from public.speakers where name = 'Carlos Rivera'),
  '2026-06-15 10:30:00+00',
  '2026-06-15 11:30:00+00',
  'main'
),
(
  'The Edge-First Web',
  'Priya Sharma on the future of web rendering at the edge.',
  (select id from public.speakers where name = 'Priya Sharma'),
  '2026-06-15 10:30:00+00',
  '2026-06-15 11:30:00+00',
  'workshop'
),
(
  'Lunch & Networking',
  'Catered lunch with topic-based discussion tables.',
  null,
  '2026-06-15 12:00:00+00',
  '2026-06-15 13:30:00+00',
  'main'
),
(
  'Workshop: Hands-on AI Agents',
  'Build a working AI agent from scratch with David Park. Bring your laptop.',
  (select id from public.speakers where name = 'David Park'),
  '2026-06-15 14:00:00+00',
  '2026-06-15 16:00:00+00',
  'workshop'
);

-- Day 2: June 16, 2026
insert into public.schedule_items (title, description, speaker_id, start_time, end_time, track) values
(
  'Shift Left Without the Guilt',
  'James Okafor on practical DevSecOps for real teams.',
  (select id from public.speakers where name = 'James Okafor'),
  '2026-06-16 09:00:00+00',
  '2026-06-16 10:00:00+00',
  'main'
),
(
  'Postgres Everywhere',
  'Lina Bergstrom on serverless Postgres, branching, and the future of databases.',
  (select id from public.speakers where name = 'Lina Bergstrom'),
  '2026-06-16 10:30:00+00',
  '2026-06-16 11:30:00+00',
  'main'
),
(
  'Panel: The Future of Developer Tools',
  'All speakers join for a moderated panel on where dev tools are headed.',
  null,
  '2026-06-16 11:45:00+00',
  '2026-06-16 12:45:00+00',
  'main'
),
(
  'Lunch & Lightning Talks',
  'Open-mic lightning talks (5 min each) plus catered lunch.',
  null,
  '2026-06-16 13:00:00+00',
  '2026-06-16 14:00:00+00',
  'main'
),
(
  'Building Reliable AI Agents',
  'David Park dives deep into production AI agent patterns.',
  (select id from public.speakers where name = 'David Park'),
  '2026-06-16 14:00:00+00',
  '2026-06-16 15:30:00+00',
  'main'
),
(
  'Closing Remarks & After-Party',
  'Wrap-up, awards, and rooftop after-party with city views.',
  null,
  '2026-06-16 16:00:00+00',
  '2026-06-16 18:00:00+00',
  'main'
);

-- Sponsors (8 across 3 tiers)
insert into public.sponsors (name, logo_url, tier, website, sort_order) values
('Vercel',     'https://api.dicebear.com/9.x/identicon/svg?seed=vercel',     'platinum', 'https://vercel.com',     1),
('Supabase',   'https://api.dicebear.com/9.x/identicon/svg?seed=supabase',   'platinum', 'https://supabase.com',   2),
('Anthropic',  'https://api.dicebear.com/9.x/identicon/svg?seed=anthropic',  'gold',     'https://anthropic.com',  3),
('Neon',       'https://api.dicebear.com/9.x/identicon/svg?seed=neon',       'gold',     'https://neon.tech',      4),
('Stripe',     'https://api.dicebear.com/9.x/identicon/svg?seed=stripe',     'gold',     'https://stripe.com',     5),
('GitHub',     'https://api.dicebear.com/9.x/identicon/svg?seed=github',     'silver',   'https://github.com',     6),
('Tailwind',   'https://api.dicebear.com/9.x/identicon/svg?seed=tailwind',   'silver',   'https://tailwindcss.com',7),
('Cloudflare', 'https://api.dicebear.com/9.x/identicon/svg?seed=cloudflare', 'silver',   'https://cloudflare.com', 8);

-- Sample registrations (5)
insert into public.registrations (email, name, company, ticket_type) values
('sarah.johnson@techcorp.io',  'Sarah Johnson',  'TechCorp',          'vip'),
('mike.chen@startup.dev',      'Mike Chen',       'Startup Labs',      'general'),
('emma.wilson@bigco.com',      'Emma Wilson',     'BigCo Engineering', 'vip'),
('raj.patel@devshop.io',       'Raj Patel',       'DevShop',           'general'),
('anna.kowalski@freelance.dev', 'Anna Kowalski',  '',                  'general');
