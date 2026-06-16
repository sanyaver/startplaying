import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession, getGameMaster } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth-stub";
import {
  calcTotal,
  clampSeats,
  formatSessionDate,
  formatUSD,
  makeBookingRef,
} from "@/lib/booking";

export default async function BookingSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ seats?: string }>;
}) {
  const { sessionId } = await params;
  const { seats: seatsParam } = await searchParams;

  const session = getSession(sessionId);
  if (!session) notFound();

  const gm = getGameMaster(session.gmId);
  const user = getCurrentUser();

  const seats = clampSeats(Number(seatsParam ?? "1"), session);
  const total = calcTotal(seats, session.pricePerSeat);
  const ref = makeBookingRef(session.id, seats);

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-5 py-16 text-center sm:px-8">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/60">
        <svg
          className="h-8 w-8 text-green-600 dark:text-green-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        You&apos;re booked!
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Confirmation sent to {user.name}. Booking reference{" "}
        <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">{ref}</span>
      </p>

      <div className="mt-8 w-full rounded-2xl border border-zinc-200 p-5 text-left dark:border-zinc-800">
        <h2 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-50">{session.title}</h2>
        <dl className="flex flex-col gap-2 text-sm">
          <Row label="Game Master" value={gm?.name ?? "—"} />
          <Row label="System" value={session.system} />
          <Row label="When" value={formatSessionDate(session.startsAt)} />
          <Row label="Duration" value={`${session.durationHours} hours`} />
          <Row label="Seats" value={String(seats)} />
          <div className="mt-1 flex justify-between border-t border-zinc-200 pt-3 text-base font-semibold text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
            <dt>Total paid</dt>
            <dd className="tabular-nums">{formatUSD(total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Link
          href={`/gm/${session.gmId}`}
          className="flex h-11 flex-1 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Back to {gm?.name ?? "Game Master"}
        </Link>
        <Link
          href="/"
          className="flex h-11 flex-1 items-center justify-center rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Browse more games
        </Link>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
      <dd className="font-medium text-zinc-800 dark:text-zinc-200">{value}</dd>
    </div>
  );
}
