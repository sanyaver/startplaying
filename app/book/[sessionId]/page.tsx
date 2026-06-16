import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSession, getGameMaster } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth-stub";
import { formatSessionDate, formatUSD } from "@/lib/booking";
import { BookingForm } from "@/components/booking/BookingForm";

export default async function BookSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const session = getSession(sessionId);
  if (!session) notFound();

  const gm = getGameMaster(session.gmId);
  const user = getCurrentUser();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8">
      <Link
        href={`/gm/${session.gmId}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        ← Back to {gm?.name ?? "Game Master"}
      </Link>

      <h1 className="mb-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Confirm your booking
      </h1>
      <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        Booking as <span className="font-medium text-zinc-700 dark:text-zinc-300">{user.name}</span>
      </p>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        {/* Session summary */}
        <div className="flex gap-4 border-b border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
          {gm && (
            <Image
              src={gm.avatarUrl}
              alt={gm.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-xl object-cover ring-1 ring-zinc-200 dark:ring-zinc-700"
              unoptimized
            />
          )}
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">{session.title}</span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {session.system} · {session.durationHours}h
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {formatSessionDate(session.startsAt)}
            </span>
            {gm && (
              <span className="text-sm text-zinc-500 dark:text-zinc-400">with {gm.name}</span>
            )}
          </div>
          <div className="ml-auto text-right">
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {formatUSD(session.pricePerSeat)}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">per seat</div>
          </div>
        </div>

        {/* Seat picker + mock checkout */}
        <div className="p-5">
          <BookingForm session={session} />
        </div>
      </div>
    </main>
  );
}
