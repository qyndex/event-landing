import { describe, it, expect } from "vitest";
import { getCountdownParts } from "./countdown";

describe("getCountdownParts", () => {
  const baseMs = new Date("2026-06-15T09:00:00Z").getTime();

  it("returns zeros when target is in the past", () => {
    const afterTarget = baseMs + 1000;
    const result = getCountdownParts("2026-06-15T09:00:00Z", afterTarget);
    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it("returns zeros when now equals target", () => {
    const result = getCountdownParts("2026-06-15T09:00:00Z", baseMs);
    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it("computes days correctly", () => {
    const twoDaysBefore = baseMs - 2 * 86_400_000;
    const result = getCountdownParts("2026-06-15T09:00:00Z", twoDaysBefore);
    expect(result.days).toBe(2);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });

  it("computes hours correctly", () => {
    const threeHoursBefore = baseMs - 3 * 3_600_000;
    const result = getCountdownParts("2026-06-15T09:00:00Z", threeHoursBefore);
    expect(result.days).toBe(0);
    expect(result.hours).toBe(3);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });

  it("computes minutes and seconds correctly", () => {
    const offset = 90 * 1000 + 45 * 1000; // 2 min 15 sec => no, 2 * 60000 + 15000 = 135000
    const before = baseMs - (2 * 60_000 + 15_000);
    const result = getCountdownParts("2026-06-15T09:00:00Z", before);
    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(2);
    expect(result.seconds).toBe(15);
  });

  it("handles mixed days, hours, minutes, seconds", () => {
    // 1 day + 2 hours + 3 minutes + 4 seconds before
    const delta = 1 * 86_400_000 + 2 * 3_600_000 + 3 * 60_000 + 4_000;
    const result = getCountdownParts("2026-06-15T09:00:00Z", baseMs - delta);
    expect(result.days).toBe(1);
    expect(result.hours).toBe(2);
    expect(result.minutes).toBe(3);
    expect(result.seconds).toBe(4);
  });

  it("defaults to Date.now() when no 'now' is passed (smoke test)", () => {
    // Target far in the future — just assert it does not throw and days > 0
    const result = getCountdownParts("2099-01-01T00:00:00Z");
    expect(result.days).toBeGreaterThan(0);
  });
});
