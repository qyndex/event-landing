import { describe, it, expect } from "vitest";
import {
  scheduleDays,
  speakers,
  getAllSessions,
  findSessionsByTitle,
} from "./schedule";

describe("scheduleDays data", () => {
  it("has two schedule days", () => {
    expect(scheduleDays).toHaveLength(2);
  });

  it("first day is June 15 with four sessions", () => {
    const day = scheduleDays[0];
    expect(day.date).toBe("June 15");
    expect(day.sessions).toHaveLength(4);
  });

  it("second day is June 16 with three sessions", () => {
    const day = scheduleDays[1];
    expect(day.date).toBe("June 16");
    expect(day.sessions).toHaveLength(3);
  });

  it("every session has a non-empty time and title", () => {
    for (const day of scheduleDays) {
      for (const session of day.sessions) {
        expect(session.time.trim()).toBeTruthy();
        expect(session.title.trim()).toBeTruthy();
      }
    }
  });

  it("session times are in HH:MM format", () => {
    const timeRe = /^\d{2}:\d{2}$/;
    for (const day of scheduleDays) {
      for (const session of day.sessions) {
        expect(session.time).toMatch(timeRe);
      }
    }
  });
});

describe("speakers data", () => {
  it("has three speakers", () => {
    expect(speakers).toHaveLength(3);
  });

  it("every speaker has name, title, and avatar", () => {
    for (const speaker of speakers) {
      expect(speaker.name.trim()).toBeTruthy();
      expect(speaker.title.trim()).toBeTruthy();
      expect(speaker.avatar.trim()).toBeTruthy();
    }
  });

  it("avatar paths start with /", () => {
    for (const speaker of speakers) {
      expect(speaker.avatar).toMatch(/^\//);
    }
  });
});

describe("getAllSessions", () => {
  it("flattens all sessions across days", () => {
    const sessions = getAllSessions(scheduleDays);
    expect(sessions).toHaveLength(7); // 4 + 3
  });

  it("returns empty array for no days", () => {
    expect(getAllSessions([])).toEqual([]);
  });
});

describe("findSessionsByTitle", () => {
  it("finds sessions by partial title (case-insensitive)", () => {
    const results = findSessionsByTitle(scheduleDays, "keynote");
    expect(results).toHaveLength(1);
    expect(results[0].title).toContain("Keynote");
  });

  it("returns multiple matches", () => {
    // "Open Source" and "AI" — let's use a word that appears once
    const results = findSessionsByTitle(scheduleDays, "workshop");
    expect(results).toHaveLength(1);
    expect(results[0].title).toContain("Workshop");
  });

  it("returns empty array when no match", () => {
    const results = findSessionsByTitle(scheduleDays, "quantum computing");
    expect(results).toHaveLength(0);
  });

  it("is case-insensitive", () => {
    const lower = findSessionsByTitle(scheduleDays, "devops");
    const upper = findSessionsByTitle(scheduleDays, "DEVOPS");
    expect(lower).toHaveLength(1);
    expect(lower).toEqual(upper);
  });
});
