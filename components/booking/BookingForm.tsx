"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Session } from "@/types";
import { calcTotal, clampSeats, formatUSD } from "@/lib/booking";

type Status = "idle" | "processing" | "done";

export function BookingForm({ session }: { session: Session }) {
  const router = useRouter();
  const [seats, setSeats] = useState(1);
  const [status, setStatus] = useState<Status>("idle");

  const maxSeats = Math.max(1, session.seatsLeft);
  const total = calcTotal(seats, session.pricePerSeat);

  function setSeatsSafe(next: number) {
    setSeats(clampSeats(next, session));
  }

  async function handlePay() {
    if (status !== "idle") return;
    setStatus("processing");
    // Mock payment — simulate a checkout round-trip. No Stripe, no webhooks.
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("done");
    router.push(`/book/${session.id}/success?seats=${seats}`);
  }

  const busy = status !== "idle";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Seats
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease seats"
            disabled={busy || seats <= 1}
            onClick={() => setSeatsSafe(seats - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 text-lg font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            −
          </button>
          <span className="min-w-10 text-center text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {seats}
          </span>
          <button
            type="button"
            aria-label="Increase seats"
            disabled={busy || seats >= maxSeats}
            onClick={() => setSeatsSafe(seats + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 text-lg font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            +
          </button>
          <span className="ml-1 text-sm text-zinc-500 dark:text-zinc-400">
            {session.seatsLeft} {session.seatsLeft === 1 ? "seat" : "seats"} left
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-zinc-50 p-4 text-sm dark:bg-zinc-900/60">
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
          <span>
            {formatUSD(session.pricePerSeat)} × {seats} {seats === 1 ? "seat" : "seats"}
          </span>
          <span className="tabular-nums">{formatUSD(total)}</span>
        </div>
        <div className="mt-1 flex justify-between border-t border-zinc-200 pt-2 text-base font-semibold text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
          <span>Total</span>
          <span className="tabular-nums">{formatUSD(total)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePay}
        disabled={busy}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 text-base font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-80"
      >
        {status === "idle" && <>Pay {formatUSD(total)}</>}
        {status === "processing" && (
          <>
            <Spinner /> Processing payment…
          </>
        )}
        {status === "done" && <>Confirmed — redirecting…</>}
      </button>

      <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
        Mock checkout — no real card is charged.
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
