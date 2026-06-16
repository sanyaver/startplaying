import type { User } from "@/types";

// TEMPORARY auth stub. Orchestrator replaces this with real Clerk at integration.
// Booking agent: import { getCurrentUser } from "@/lib/auth-stub" and build against it.
export function getCurrentUser(): User {
  return { id: "demo-player", name: "Demo Player", email: "demo@startplaying.games" };
}

export const isAuthenticated = (): boolean => true;
