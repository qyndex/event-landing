export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Compute time-remaining parts from a target ISO date string.
 * Returns all zeros if the target is in the past.
 */
export function getCountdownParts(
  targetDate: string,
  now: number = Date.now()
): CountdownParts {
  const diff = Math.max(0, new Date(targetDate).getTime() - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);
  return { days, hours, minutes, seconds };
}
