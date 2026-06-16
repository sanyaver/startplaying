import Link from "next/link";
import { gameMasters } from "@/lib/data";
import FilterBar from "@/components/FilterBar";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(139,92,246,0.25),transparent)]" />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:py-28">
          <span className="mb-4 rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-300">
            🎲 The marketplace for tabletop RPGs
          </span>
          <h1 className="text-balance text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Find your next{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Game Master
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg text-zinc-300">
            Browse professional GMs, filter by system, style and budget, and book
            your next D&amp;D, Pathfinder, or Call of Cthulhu session in minutes.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="#browse"
              className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-900/30 transition-transform hover:scale-105"
            >
              Browse Game Masters
            </Link>
            <Link
              href="/quiz"
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-zinc-200 transition-colors hover:bg-white/5"
            >
              Find my game
            </Link>
          </div>
        </div>
      </section>

      {/* Browse */}
      <section id="browse" className="mx-auto max-w-7xl scroll-mt-16 px-4 pb-20">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Browse Game Masters
          </h2>
          <p className="mt-1 text-zinc-400">
            {gameMasters.length} professional GMs ready to run your table.
          </p>
        </div>
        <FilterBar gameMasters={gameMasters} />
      </section>
    </>
  );
}
