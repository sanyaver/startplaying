import Link from "next/link";
import type { GameMaster } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function StarRating({ rating, reviewsCount }: { rating: number; reviewsCount: number }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="size-4 fill-amber-400"
      >
        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
      </svg>
      <span className="font-semibold text-white">{rating.toFixed(1)}</span>
      <span className="text-zinc-500">({reviewsCount})</span>
    </div>
  );
}

export default function GMCard({ gm }: { gm: GameMaster }) {
  return (
    <Link
      href={`/gm/${gm.id}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-2xl"
      aria-label={`View profile for ${gm.name}`}
    >
      <Card className="h-full gap-0 overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] p-0 text-zinc-100 transition-all duration-200 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-violet-900/20">
        {/* Avatar */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gm.avatarUrl}
            alt={gm.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur">
            <StarRating rating={gm.rating} reviewsCount={gm.reviewsCount} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-lg font-bold leading-tight text-white">{gm.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{gm.tagline}</p>

          {/* Systems */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {gm.systems.map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="border-violet-400/30 bg-violet-500/10 text-violet-200"
              >
                {s}
              </Badge>
            ))}
          </div>

          {/* Styles */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {gm.styles.map((st) => (
              <Badge
                key={st}
                variant="outline"
                className="border-white/15 bg-white/5 text-zinc-300"
              >
                {st}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <p className="text-sm text-zinc-400">
              from{" "}
              <span className="text-base font-bold text-white">
                ${gm.pricePerSession}
              </span>
              <span className="text-zinc-500"> / session</span>
            </p>
            <span className="text-sm font-semibold text-violet-300 transition-colors group-hover:text-violet-200">
              View profile →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
