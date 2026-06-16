import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameMaster } from "@/lib/data";
import { formatSessionDate, formatUSD } from "@/lib/booking";
import type { Review, Session } from "@/types";

export default async function GMProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gm = getGameMaster(id);
  if (!gm) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10 sm:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        ← Browse Game Masters
      </Link>

      {/* Header */}
      <header className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Image
          src={gm.avatarUrl}
          alt={gm.name}
          width={112}
          height={112}
          className="h-28 w-28 rounded-2xl object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
          unoptimized
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {gm.name}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">{gm.tagline}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
              ★ {gm.rating.toFixed(1)}
              <span className="font-normal text-zinc-500 dark:text-zinc-400">
                ({gm.reviewsCount} reviews)
              </span>
            </span>
            <span>From {formatUSD(gm.pricePerSession)}/session</span>
            <span>{gm.languages.join(" · ")}</span>
          </div>
        </div>
      </header>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {gm.systems.map((s) => (
          <Tag key={s} className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
            {s}
          </Tag>
        ))}
        {gm.styles.map((s) => (
          <Tag key={s} className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {s}
          </Tag>
        ))}
      </div>

      {/* Bio */}
      <section className="mt-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
          About
        </h2>
        <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">{gm.bio}</p>
      </section>

      {/* Sessions */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Upcoming sessions
        </h2>
        <ul className="flex flex-col gap-3">
          {gm.sessions.map((session) => (
            <SessionRow key={session.id} session={session} />
          ))}
        </ul>
      </section>

      {/* Reviews */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Reviews
        </h2>
        <ul className="flex flex-col gap-4">
          {gm.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
      </section>
    </main>
  );
}

function SessionRow({ session }: { session: Session }) {
  const soldOut = session.seatsLeft <= 0;
  return (
    <li className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-300 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:hover:border-zinc-700">
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-zinc-900 dark:text-zinc-50">{session.title}</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {session.system} · {formatSessionDate(session.startsAt)} · {session.durationHours}h
        </span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {formatUSD(session.pricePerSeat)}/seat · {session.seatsLeft} of {session.seatsTotal} seats left
        </span>
      </div>
      {soldOut ? (
        <span className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-100 px-5 text-sm font-medium text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
          Sold out
        </span>
      ) : (
        <Link
          href={`/book/${session.id}`}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Book
        </Link>
      )}
    </li>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-medium text-zinc-900 dark:text-zinc-50">{review.author}</span>
        <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
          {"★".repeat(review.rating)}
          <span className="text-zinc-300 dark:text-zinc-700">{"★".repeat(5 - review.rating)}</span>
        </span>
      </div>
      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{review.comment}</p>
    </li>
  );
}

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${className ?? ""}`}>
      {children}
    </span>
  );
}
