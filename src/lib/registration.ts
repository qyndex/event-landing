import { supabase, isSupabaseConfigured } from "./supabase";

export interface RegistrationData {
  name: string;
  email: string;
  ticket: string;
  company?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface SubmitResult {
  success: boolean;
  error?: string;
}

const TICKET_TYPES = ["general", "vip", "workshop"] as const;
export type TicketType = (typeof TICKET_TYPES)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates registration form data. Returns errors keyed by field name. */
export function validateRegistration(data: RegistrationData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = "Full name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.ticket) {
    errors.ticket = "Please select a ticket type.";
  } else if (!(TICKET_TYPES as readonly string[]).includes(data.ticket)) {
    errors.ticket = "Invalid ticket type.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/** Submit registration to Supabase. Returns success/error. */
export async function submitRegistration(
  data: RegistrationData
): Promise<SubmitResult> {
  if (!isSupabaseConfigured()) {
    return { success: true }; // Graceful no-op when Supabase is not set up
  }

  try {
    const { error } = await supabase.from("registrations").insert({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company?.trim() ?? "",
      ticket_type: data.ticket,
    });

    if (error) {
      if (error.code === "23505") {
        return { success: false, error: "This email is already registered." };
      }
      return { success: false, error: "Registration failed. Please try again." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
