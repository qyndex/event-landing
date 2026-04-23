import { supabase, isSupabaseConfigured } from "./supabase";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Session {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
  track?: string;
}

export interface ScheduleDay {
  date: string;
  sessions: Session[];
}

export interface Speaker {
  name: string;
  title: string;
  company: string;
  bio: string;
  avatar: string;
  talkTitle: string;
  talkDescription: string;
}

export interface Sponsor {
  name: string;
  logoUrl: string;
  tier: "platinum" | "gold" | "silver";
  website: string;
}

// ---------------------------------------------------------------------------
// Static fallback data (used when Supabase is not configured)
// ---------------------------------------------------------------------------

export const fallbackSpeakers: Speaker[] = [
  {
    name: "Dr. Maya Chen",
    title: "Chief AI Scientist",
    company: "DeepMind",
    bio: "Leads the foundational models team at DeepMind. Her research on emergent reasoning has been cited over 12,000 times.",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=maya",
    talkTitle: "Keynote: Intelligence Beyond Imitation",
    talkDescription: "How the next generation of AI systems will move past pattern matching toward genuine understanding.",
  },
  {
    name: "Carlos Rivera",
    title: "VP of Platform Engineering",
    company: "Stripe",
    bio: "15 years building payment infrastructure processing billions of transactions. Open-source maintainer and distributed systems expert.",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=carlos",
    talkTitle: "Scaling APIs to a Billion Requests",
    talkDescription: "Lessons from scaling Stripe's API gateway: rate limiting, circuit breakers, and observability.",
  },
  {
    name: "Priya Sharma",
    title: "Staff Engineer",
    company: "Vercel",
    bio: "Core contributor to Next.js and edge computing expert. Ships features used by millions of developers.",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=priya",
    talkTitle: "The Edge-First Web",
    talkDescription: "Server components, streaming SSR, and edge functions — the rendering model of the web is being rewritten.",
  },
  {
    name: "James Okafor",
    title: "Security Engineering Lead",
    company: "GitHub",
    bio: "Built GitHub's secret scanning and code security features. Passionate about making security accessible to every developer.",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=james",
    talkTitle: "Shift Left Without the Guilt",
    talkDescription: "Practical DevSecOps that developers actually adopt — automated scanning and policy-as-code.",
  },
  {
    name: "Lina Bergstrom",
    title: "CTO",
    company: "Neon",
    bio: "Co-founded Neon to bring serverless Postgres to every developer. Former AWS engineer with three patents on database replication.",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=lina",
    talkTitle: "Postgres Everywhere",
    talkDescription: "How serverless Postgres with instant branching changes development workflows.",
  },
  {
    name: "David Park",
    title: "Developer Advocate",
    company: "Anthropic",
    bio: "Helps developers build with Claude and the Anthropic API. Co-authored 'Production AI Systems' (O'Reilly, 2025).",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=david",
    talkTitle: "Building Reliable AI Agents",
    talkDescription: "Patterns for AI agents in production — tool use, self-correction, evaluation, and knowing when to fail.",
  },
];

export const fallbackScheduleDays: ScheduleDay[] = [
  {
    date: "June 15",
    sessions: [
      { time: "08:00", title: "Registration & Welcome Coffee", track: "main" },
      { time: "09:00", title: "Keynote: Intelligence Beyond Imitation", speaker: "Dr. Maya Chen", track: "main" },
      { time: "10:30", title: "Scaling APIs to a Billion Requests", speaker: "Carlos Rivera", track: "main" },
      { time: "10:30", title: "The Edge-First Web", speaker: "Priya Sharma", track: "workshop" },
      { time: "12:00", title: "Lunch & Networking", track: "main" },
      { time: "14:00", title: "Workshop: Hands-on AI Agents", speaker: "David Park", track: "workshop" },
    ],
  },
  {
    date: "June 16",
    sessions: [
      { time: "09:00", title: "Shift Left Without the Guilt", speaker: "James Okafor", track: "main" },
      { time: "10:30", title: "Postgres Everywhere", speaker: "Lina Bergstrom", track: "main" },
      { time: "11:45", title: "Panel: The Future of Developer Tools", track: "main" },
      { time: "13:00", title: "Lunch & Lightning Talks", track: "main" },
      { time: "14:00", title: "Building Reliable AI Agents", speaker: "David Park", track: "main" },
      { time: "16:00", title: "Closing Remarks & After-Party", track: "main" },
    ],
  },
];

export const fallbackSponsors: Sponsor[] = [
  { name: "Vercel", logoUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=vercel", tier: "platinum", website: "https://vercel.com" },
  { name: "Supabase", logoUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=supabase", tier: "platinum", website: "https://supabase.com" },
  { name: "Anthropic", logoUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=anthropic", tier: "gold", website: "https://anthropic.com" },
  { name: "Neon", logoUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=neon", tier: "gold", website: "https://neon.tech" },
  { name: "Stripe", logoUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=stripe", tier: "gold", website: "https://stripe.com" },
  { name: "GitHub", logoUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=github", tier: "silver", website: "https://github.com" },
  { name: "Tailwind", logoUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=tailwind", tier: "silver", website: "https://tailwindcss.com" },
  { name: "Cloudflare", logoUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=cloudflare", tier: "silver", website: "https://cloudflare.com" },
];

// Keep legacy exports for backward-compat with existing tests
export const scheduleDays = fallbackScheduleDays;
export const speakers = fallbackSpeakers;

// ---------------------------------------------------------------------------
// Supabase data fetchers (used at build time in Astro frontmatter)
// ---------------------------------------------------------------------------

/** Fetch speakers from Supabase, falling back to static data. */
export async function fetchSpeakers(): Promise<Speaker[]> {
  if (!isSupabaseConfigured()) return fallbackSpeakers;
  try {
    const { data, error } = await supabase
      .from("speakers")
      .select("name, title, company, bio, avatar_url, talk_title, talk_description")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return fallbackSpeakers;
    return data.map((s) => ({
      name: s.name,
      title: s.title,
      company: s.company,
      bio: s.bio,
      avatar: s.avatar_url,
      talkTitle: s.talk_title,
      talkDescription: s.talk_description,
    }));
  } catch {
    return fallbackSpeakers;
  }
}

/** Fetch schedule items grouped by day, falling back to static data. */
export async function fetchSchedule(): Promise<ScheduleDay[]> {
  if (!isSupabaseConfigured()) return fallbackScheduleDays;
  try {
    const { data, error } = await supabase
      .from("schedule_items")
      .select("title, description, start_time, end_time, track, speakers(name)")
      .order("start_time", { ascending: true });
    if (error || !data?.length) return fallbackScheduleDays;

    const dayMap = new Map<string, Session[]>();
    for (const item of data) {
      const dt = new Date(item.start_time);
      const dayKey = dt.toLocaleDateString("en-US", { month: "long", day: "numeric" });
      const time = dt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      const speakerName = (item.speakers as { name: string } | null)?.name;
      const session: Session = {
        time,
        title: item.title,
        description: item.description,
        speaker: speakerName ?? undefined,
        track: item.track,
      };
      const existing = dayMap.get(dayKey) ?? [];
      existing.push(session);
      dayMap.set(dayKey, existing);
    }
    return Array.from(dayMap.entries()).map(([date, sessions]) => ({ date, sessions }));
  } catch {
    return fallbackScheduleDays;
  }
}

/** Fetch sponsors from Supabase, falling back to static data. */
export async function fetchSponsors(): Promise<Sponsor[]> {
  if (!isSupabaseConfigured()) return fallbackSponsors;
  try {
    const { data, error } = await supabase
      .from("sponsors")
      .select("name, logo_url, tier, website")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return fallbackSponsors;
    return data.map((s) => ({
      name: s.name,
      logoUrl: s.logo_url,
      tier: s.tier as Sponsor["tier"],
      website: s.website,
    }));
  } catch {
    return fallbackSponsors;
  }
}

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------

/** Returns all sessions across all days as a flat list. */
export function getAllSessions(days: ScheduleDay[]): Session[] {
  return days.flatMap((d) => d.sessions);
}

/** Returns sessions matching a title substring (case-insensitive). */
export function findSessionsByTitle(
  days: ScheduleDay[],
  query: string
): Session[] {
  const lower = query.toLowerCase();
  return getAllSessions(days).filter((s) =>
    s.title.toLowerCase().includes(lower)
  );
}
