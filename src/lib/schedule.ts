export interface Session {
  time: string;
  title: string;
}

export interface ScheduleDay {
  date: string;
  sessions: Session[];
}

export const scheduleDays: ScheduleDay[] = [
  {
    date: "June 15",
    sessions: [
      { time: "09:00", title: "Registration & Coffee" },
      { time: "10:00", title: "Keynote: The Future of Computing" },
      { time: "12:00", title: "Lunch Break" },
      { time: "14:00", title: "Workshop: Hands-on AI" },
    ],
  },
  {
    date: "June 16",
    sessions: [
      { time: "09:00", title: "Open Source at Scale" },
      { time: "11:00", title: "Panel: DevOps Best Practices" },
      { time: "14:00", title: "Debugging the Impossible" },
    ],
  },
];

export interface Speaker {
  name: string;
  title: string;
  avatar: string;
}

export const speakers: Speaker[] = [
  {
    name: "Dr. Ada Lovelace",
    title: "Keynote: The Future of Computing",
    avatar: "/avatars/ada.jpg",
  },
  {
    name: "Linus T.",
    title: "Open Source at Scale",
    avatar: "/avatars/linus.jpg",
  },
  {
    name: "Grace Hopper",
    title: "Debugging the Impossible",
    avatar: "/avatars/grace.jpg",
  },
];

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
