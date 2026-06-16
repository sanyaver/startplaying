import Link from "next/link";

// PLACEHOLDER home — Agent A (feat/listings) replaces this with the GM grid + filters.
export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(139,92,246,0.25),transparent)]" />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-28 text-center">
        <span className="mb-4 rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-300">
          🎲 The marketplace for tabletop RPGs
        </span>
        <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-6xl">
          Find your next{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Game Master
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg text-zinc-300">
          Browse professional GMs, filter by system, style and schedule, and book
          your next D&amp;D, Pathfinder, or Call of Cthulhu session in minutes.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/quiz"
            className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-semibold shadow-lg shadow-violet-900/30 transition-transform hover:scale-105"
          >
            Find my game
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-white/15 px-6 py-3 font-semibold text-zinc-200 hover:bg-white/5"
          >
            Browse events
          </Link>
        </div>
        <p className="mt-12 text-sm text-zinc-500">Listings loading… (Agent A)</p>
      </div>
    </section>
  );
}
