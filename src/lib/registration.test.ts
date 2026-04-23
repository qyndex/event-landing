import { describe, it, expect } from "vitest";
import { validateRegistration } from "./registration";

const valid = { name: "Alice", email: "alice@example.com", ticket: "general" };

describe("validateRegistration", () => {
  it("returns valid=true for a correct payload", () => {
    const result = validateRegistration(valid);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("rejects empty name", () => {
    const result = validateRegistration({ ...valid, name: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeTruthy();
  });

  it("rejects whitespace-only name", () => {
    const result = validateRegistration({ ...valid, name: "   " });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeTruthy();
  });

  it("rejects empty email", () => {
    const result = validateRegistration({ ...valid, email: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeTruthy();
  });

  it("rejects malformed email", () => {
    const result = validateRegistration({ ...valid, email: "not-an-email" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeTruthy();
  });

  it("accepts both valid ticket types", () => {
    for (const ticket of ["general", "vip"] as const) {
      const result = validateRegistration({ ...valid, ticket });
      expect(result.valid).toBe(true);
    }
  });

  it("rejects empty ticket", () => {
    const result = validateRegistration({ ...valid, ticket: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.ticket).toBeTruthy();
  });

  it("rejects unknown ticket type", () => {
    const result = validateRegistration({ ...valid, ticket: "platinum" });
    expect(result.valid).toBe(false);
    expect(result.errors.ticket).toBeTruthy();
  });

  it("accumulates multiple errors", () => {
    const result = validateRegistration({ name: "", email: "bad", ticket: "" });
    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors)).toHaveLength(3);
  });
});
