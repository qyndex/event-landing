export interface RegistrationData {
  name: string;
  email: string;
  ticket: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const TICKET_TYPES = ["general", "vip"] as const;
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
