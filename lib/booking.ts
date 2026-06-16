import type { Session } from "@/types";

// Booking-flow helpers. Pure utilities only — the shared contract lives in
// types/index.ts and lib/data.ts, which feature branches must not modify.

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function clampSeats(seats: number, session: Pick<Session, "seatsLeft">): number {
  const max = Math.max(1, session.seatsLeft);
  if (!Number.isFinite(seats)) return 1;
  return Math.min(Math.max(1, Math.round(seats)), max);
}

export function calcTotal(seats: number, pricePerSeat: number): number {
  return clamp0(seats) * pricePerSeat;
}

function clamp0(n: number): number {
  return n > 0 ? n : 0;
}

// Deterministic-ish human-friendly booking reference for the confirmation screen.
export function makeBookingRef(sessionId: string, seats: number): string {
  let hash = 0;
  const seed = `${sessionId}:${seats}`;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const code = hash.toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
  return `SPG-${code}`;
}

export function formatSessionDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
