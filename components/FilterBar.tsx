"use client";

import { useMemo, useState } from "react";
import type { GameMaster, GameSystem, PlayStyle } from "@/types";
import { ALL_SYSTEMS, ALL_STYLES } from "@/lib/data";
import GMCard from "@/components/GMCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const ANY_SYSTEM = "All systems";
const ANY_STYLE = "All styles";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
};

const triggerCls =
  "w-full border-white/15 bg-white/5 text-zinc-100 hover:bg-white/10 data-[placeholder]:text-zinc-400";
const contentCls = "border-white/10 bg-[#15151d] text-zinc-100";
const itemCls = "text-zinc-200 focus:bg-violet-500/20 focus:text-white";

export default function FilterBar({
  gameMasters,
}: {
  gameMasters: GameMaster[];
}) {
  const priceBounds = useMemo(() => {
    const prices = gameMasters.map((gm) => gm.pricePerSession);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [gameMasters]);

  const [system, setSystem] = useState<string>(ANY_SYSTEM);
  const [style, setStyle] = useState<string>(ANY_STYLE);
  const [maxPrice, setMaxPrice] = useState<number>(priceBounds.max);
  const [sort, setSort] = useState<SortKey>("featured");

  const isFiltered =
    system !== ANY_SYSTEM ||
    style !== ANY_STYLE ||
    maxPrice !== priceBounds.max ||
    sort !== "featured";

  function reset() {
    setSystem(ANY_SYSTEM);
    setStyle(ANY_STYLE);
    setMaxPrice(priceBounds.max);
    setSort("featured");
  }

  const results = useMemo(() => {
    const filtered = gameMasters.filter((gm) => {
      if (system !== ANY_SYSTEM && !gm.systems.includes(system as GameSystem))
        return false;
      if (style !== ANY_STYLE && !gm.styles.includes(style as PlayStyle))
        return false;
      if (gm.pricePerSession > maxPrice) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.pricePerSession - b.pricePerSession);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.pricePerSession - a.pricePerSession);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured: rating first, then review volume
        sorted.sort(
          (a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount
        );
    }
    return sorted;
  }, [gameMasters, system, style, maxPrice, sort]);

  return (
    <div>
      {/* Filter controls */}
      <div className="sticky top-[57px] z-30 -mx-4 mb-8 border-y border-white/10 bg-[#0b0b12]/80 px-4 py-4 backdrop-blur">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* System */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              System
            </label>
            <Select value={system} onValueChange={(v) => setSystem((v as string) ?? ANY_SYSTEM)}>
              <SelectTrigger className={triggerCls}>
                <SelectValue placeholder={ANY_SYSTEM} />
              </SelectTrigger>
              <SelectContent className={contentCls}>
                <SelectItem className={itemCls} value={ANY_SYSTEM}>
                  {ANY_SYSTEM}
                </SelectItem>
                {ALL_SYSTEMS.map((s) => (
                  <SelectItem className={itemCls} key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Style */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              Play style
            </label>
            <Select value={style} onValueChange={(v) => setStyle((v as string) ?? ANY_STYLE)}>
              <SelectTrigger className={triggerCls}>
                <SelectValue placeholder={ANY_STYLE} />
              </SelectTrigger>
              <SelectContent className={contentCls}>
                <SelectItem className={itemCls} value={ANY_STYLE}>
                  {ANY_STYLE}
                </SelectItem>
                {ALL_STYLES.map((st) => (
                  <SelectItem className={itemCls} key={st} value={st}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Max price */}
          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-zinc-400">
              <span>Max price / session</span>
              <span className="font-semibold text-violet-300">${maxPrice}</span>
            </label>
            <Slider
              className="py-2.5 [&_[data-slot=slider-range]]:bg-violet-500 [&_[data-slot=slider-track]]:bg-white/15"
              min={priceBounds.min}
              max={priceBounds.max}
              step={1}
              value={[maxPrice]}
              onValueChange={(v) =>
                setMaxPrice(Array.isArray(v) ? v[0] : (v as number))
              }
            />
          </div>

          {/* Sort */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              Sort by
            </label>
            <Select
              value={sort}
              onValueChange={(v) => setSort(((v as SortKey) ?? "featured"))}
            >
              <SelectTrigger className={triggerCls}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={contentCls}>
                {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                  <SelectItem className={itemCls} key={k} value={k}>
                    {SORT_LABELS[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result count + reset */}
        <div className="mt-3 flex items-center justify-between text-sm">
          <p className="text-zinc-400">
            <span className="font-semibold text-white">{results.length}</span>{" "}
            {results.length === 1 ? "Game Master" : "Game Masters"} available
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={reset}
              className="font-medium text-violet-300 transition-colors hover:text-violet-200"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((gm) => (
            <GMCard key={gm.id} gm={gm} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 py-20 text-center">
          <span className="text-4xl">🎲</span>
          <p className="mt-4 text-lg font-semibold text-white">
            No Game Masters match your filters
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Try widening your price range or clearing a filter.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/5"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
