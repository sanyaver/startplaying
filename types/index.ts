// SHARED CONTRACT — every agent imports from here. DO NOT modify in feature branches.

export type GameSystem =
  | "D&D 5e"
  | "Pathfinder 2e"
  | "Call of Cthulhu"
  | "Vampire: The Masquerade"
  | "Blades in the Dark"
  | "Starfinder"
  | "Cyberpunk RED";

export type PlayStyle =
  | "Combat-heavy"
  | "Roleplay-heavy"
  | "Balanced"
  | "Beginner-friendly"
  | "Horror"
  | "Sandbox";

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
}

export interface Session {
  id: string;
  gmId: string;
  title: string;
  system: GameSystem;
  startsAt: string; // ISO date string
  durationHours: number;
  seatsTotal: number;
  seatsLeft: number;
  pricePerSeat: number; // USD
}

export interface GameMaster {
  id: string;
  name: string;
  avatarUrl: string;
  tagline: string;
  bio: string;
  systems: GameSystem[];
  styles: PlayStyle[];
  pricePerSession: number; // USD, starting price
  rating: number; // avg, 1-5
  reviewsCount: number;
  languages: string[];
  reviews: Review[];
  sessions: Session[];
}

export interface User {
  id: string;
  name: string;
  email?: string;
}

export interface Booking {
  id: string;
  sessionId: string;
  userId: string;
  seats: number;
  total: number;
  status: "pending" | "confirmed";
  createdAt: string;
}

// Standard API response envelope
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Game Finder Quiz contract
export interface QuizAnswers {
  system?: GameSystem;
  style?: PlayStyle;
  experience?: "new" | "some" | "veteran";
  budget?: number; // max price/session
}
