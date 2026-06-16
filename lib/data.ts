import type { GameMaster, Session } from "@/types";

// Seed data — single source of truth for all agents. DO NOT modify in feature branches.

function mkSessions(gmId: string, base: Partial<Session>[]): Session[] {
  return base.map((s, i) => ({
    id: `${gmId}-s${i + 1}`,
    gmId,
    title: s.title ?? "One-shot Adventure",
    system: s.system ?? "D&D 5e",
    startsAt: s.startsAt ?? new Date(Date.now() + (i + 2) * 86400000).toISOString(),
    durationHours: s.durationHours ?? 3,
    seatsTotal: s.seatsTotal ?? 5,
    seatsLeft: s.seatsLeft ?? 3,
    pricePerSeat: s.pricePerSeat ?? 20,
  }));
}

export const gameMasters: GameMaster[] = [
  {
    id: "gm-aria",
    name: "Aria Nightshade",
    avatarUrl: "https://i.pravatar.cc/400?img=47",
    tagline: "Cinematic D&D for storytellers",
    bio: "Professional GM with 8 years behind the screen. I run immersive, character-driven campaigns where your choices reshape the world.",
    systems: ["D&D 5e", "Blades in the Dark"],
    styles: ["Roleplay-heavy", "Beginner-friendly"],
    pricePerSession: 25,
    rating: 4.9,
    reviewsCount: 212,
    languages: ["English", "Spanish"],
    reviews: [
      { id: "r1", author: "Marcus", rating: 5, comment: "Best GM I've ever played with. Voices for every NPC!" },
      { id: "r2", author: "Lena", rating: 5, comment: "Welcoming to new players. Felt like a Netflix show." },
    ],
    sessions: mkSessions("gm-aria", [
      { title: "Curse of the Crimson Court", system: "D&D 5e", pricePerSeat: 25 },
      { title: "Heist in Doskvol", system: "Blades in the Dark", pricePerSeat: 22 },
    ]),
  },
  {
    id: "gm-rook",
    name: "Rook Calloway",
    avatarUrl: "https://i.pravatar.cc/400?img=12",
    tagline: "Tactical Pathfinder, no rules left behind",
    bio: "Rules-master and tactician. If you love deep combat, build optimization, and epic boss fights, my table is for you.",
    systems: ["Pathfinder 2e", "Starfinder"],
    styles: ["Combat-heavy", "Sandbox"],
    pricePerSession: 30,
    rating: 4.8,
    reviewsCount: 156,
    languages: ["English"],
    reviews: [
      { id: "r3", author: "Devi", rating: 5, comment: "Encounters are perfectly balanced and brutal." },
    ],
    sessions: mkSessions("gm-rook", [
      { title: "Abomination Vaults", system: "Pathfinder 2e", pricePerSeat: 30, seatsLeft: 1 },
      { title: "Dead Suns: Incident at Absalom", system: "Starfinder", pricePerSeat: 28 },
    ]),
  },
  {
    id: "gm-mina",
    name: "Mina Vesper",
    avatarUrl: "https://i.pravatar.cc/400?img=32",
    tagline: "Cosmic horror that keeps you up at night",
    bio: "Specialist in slow-burn dread. Call of Cthulhu and gothic Vampire chronicles for mature, story-first tables.",
    systems: ["Call of Cthulhu", "Vampire: The Masquerade"],
    styles: ["Horror", "Roleplay-heavy"],
    pricePerSession: 28,
    rating: 5.0,
    reviewsCount: 98,
    languages: ["English", "French"],
    reviews: [
      { id: "r4", author: "Tom", rating: 5, comment: "I was genuinely scared. Incredible atmosphere." },
    ],
    sessions: mkSessions("gm-mina", [
      { title: "The Haunting", system: "Call of Cthulhu", pricePerSeat: 24 },
      { title: "Sabbat Nights", system: "Vampire: The Masquerade", pricePerSeat: 26 },
    ]),
  },
  {
    id: "gm-juno",
    name: "Juno Park",
    avatarUrl: "https://i.pravatar.cc/400?img=5",
    tagline: "Neon-soaked Cyberpunk heists",
    bio: "High-octane Cyberpunk RED and sci-fi one-shots. Fast pace, big choices, cinematic stakes.",
    systems: ["Cyberpunk RED", "Starfinder"],
    styles: ["Balanced", "Sandbox"],
    pricePerSession: 22,
    rating: 4.7,
    reviewsCount: 74,
    languages: ["English", "Korean"],
    reviews: [
      { id: "r5", author: "Sara", rating: 5, comment: "Felt like Blade Runner. So immersive." },
    ],
    sessions: mkSessions("gm-juno", [
      { title: "Night City Shakedown", system: "Cyberpunk RED", pricePerSeat: 22 },
    ]),
  },
  {
    id: "gm-bram",
    name: "Bram Holloway",
    avatarUrl: "https://i.pravatar.cc/400?img=68",
    tagline: "Your first-ever D&D night, made easy",
    bio: "I teach new players the ropes with zero judgment. Bring nothing but curiosity — I handle the rest.",
    systems: ["D&D 5e"],
    styles: ["Beginner-friendly", "Balanced"],
    pricePerSession: 15,
    rating: 4.9,
    reviewsCount: 304,
    languages: ["English"],
    reviews: [
      { id: "r6", author: "Priya", rating: 5, comment: "Never played before — now I'm hooked!" },
    ],
    sessions: mkSessions("gm-bram", [
      { title: "Lost Mine of Phandelver (Intro)", system: "D&D 5e", pricePerSeat: 15, seatsLeft: 4 },
    ]),
  },
  {
    id: "gm-sol",
    name: "Solveig Marsh",
    avatarUrl: "https://i.pravatar.cc/400?img=20",
    tagline: "Sandbox worlds that remember you",
    bio: "Long-form sandbox campaigns with living factions and consequences. For players who want a world, not a railroad.",
    systems: ["D&D 5e", "Pathfinder 2e"],
    styles: ["Sandbox", "Roleplay-heavy"],
    pricePerSession: 26,
    rating: 4.8,
    reviewsCount: 121,
    languages: ["English", "German"],
    reviews: [
      { id: "r7", author: "Ola", rating: 5, comment: "My choices actually changed the map. Wild." },
    ],
    sessions: mkSessions("gm-sol", [
      { title: "The Westmarch Frontier", system: "D&D 5e", pricePerSeat: 26 },
    ]),
  },
  {
    id: "gm-finn",
    name: "Finn O'Doyle",
    avatarUrl: "https://i.pravatar.cc/400?img=15",
    tagline: "Beer-and-pretzels chaos, all welcome",
    bio: "Lighthearted, comedic one-shots. Perfect for casual groups and friends who just want to laugh and roll dice.",
    systems: ["D&D 5e", "Blades in the Dark"],
    styles: ["Beginner-friendly", "Balanced"],
    pricePerSession: 18,
    rating: 4.6,
    reviewsCount: 88,
    languages: ["English"],
    reviews: [
      { id: "r8", author: "Kit", rating: 5, comment: "Cried laughing. Great for unwinding." },
    ],
    sessions: mkSessions("gm-finn", [
      { title: "The Tavern Job", system: "Blades in the Dark", pricePerSeat: 18 },
    ]),
  },
  {
    id: "gm-isolde",
    name: "Isolde Vance",
    avatarUrl: "https://i.pravatar.cc/400?img=23",
    tagline: "Epic high-fantasy campaigns",
    bio: "Sweeping, novelistic campaigns with deep lore and recurring villains. Commitment rewarded with payoff.",
    systems: ["Pathfinder 2e", "D&D 5e"],
    styles: ["Roleplay-heavy", "Combat-heavy"],
    pricePerSession: 32,
    rating: 4.9,
    reviewsCount: 167,
    languages: ["English", "Italian"],
    reviews: [
      { id: "r9", author: "Hugo", rating: 5, comment: "The villain arc still lives in my head." },
    ],
    sessions: mkSessions("gm-isolde", [
      { title: "Kingmaker: The Stolen Lands", system: "Pathfinder 2e", pricePerSeat: 32, seatsLeft: 2 },
    ]),
  },
  {
    id: "gm-zane",
    name: "Zane Okoro",
    avatarUrl: "https://i.pravatar.cc/400?img=51",
    tagline: "Fast, deadly horror one-shots",
    bio: "Tight 3-hour horror scenarios. High tension, real stakes, unforgettable endings.",
    systems: ["Call of Cthulhu"],
    styles: ["Horror", "Combat-heavy"],
    pricePerSession: 20,
    rating: 4.7,
    reviewsCount: 63,
    languages: ["English"],
    reviews: [
      { id: "r10", author: "Mae", rating: 5, comment: "Three hours flew by. Heart pounding the whole time." },
    ],
    sessions: mkSessions("gm-zane", [
      { title: "Masks of Nyarlathotep (Intro)", system: "Call of Cthulhu", pricePerSeat: 20 },
    ]),
  },
  {
    id: "gm-lyra",
    name: "Lyra Quinn",
    avatarUrl: "https://i.pravatar.cc/400?img=44",
    tagline: "Inclusive tables, unforgettable stories",
    bio: "Safety-tools-first GM creating welcoming spaces for LGBTQ+ and first-time players across multiple systems.",
    systems: ["Blades in the Dark", "Vampire: The Masquerade", "D&D 5e"],
    styles: ["Roleplay-heavy", "Beginner-friendly"],
    pricePerSession: 24,
    rating: 5.0,
    reviewsCount: 142,
    languages: ["English", "Spanish"],
    reviews: [
      { id: "r11", author: "Robin", rating: 5, comment: "First table where I truly felt safe to roleplay." },
    ],
    sessions: mkSessions("gm-lyra", [
      { title: "Court of Shadows", system: "Vampire: The Masquerade", pricePerSeat: 24 },
      { title: "Scoundrels of Duskwall", system: "Blades in the Dark", pricePerSeat: 22 },
    ]),
  },
];

export const allSessions: Session[] = gameMasters.flatMap((gm) => gm.sessions);

export function getGameMaster(id: string): GameMaster | undefined {
  return gameMasters.find((gm) => gm.id === id);
}

export function getSession(id: string): Session | undefined {
  return allSessions.find((s) => s.id === id);
}

export const ALL_SYSTEMS = [
  "D&D 5e",
  "Pathfinder 2e",
  "Call of Cthulhu",
  "Vampire: The Masquerade",
  "Blades in the Dark",
  "Starfinder",
  "Cyberpunk RED",
] as const;

export const ALL_STYLES = [
  "Combat-heavy",
  "Roleplay-heavy",
  "Balanced",
  "Beginner-friendly",
  "Horror",
  "Sandbox",
] as const;
