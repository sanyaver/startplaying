"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GameSystem, Session } from "@/types";
import { allSessions, getGameMaster, ALL_SYSTEMS } from "@/lib/data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Events = upcoming one-shot sessions. The seed has no separate "event" entity,
// so we derive them from every GM's sessions (allSessions) per the stub rule.

type ViewMode = "grid" | "list";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function EventCard({ session, view }: { session: Session; view: ViewMode }) {
  const gm = getGameMaster(session.gmId);
  const soldOut = session.seatsLeft <= 0;

  return (
    <Card className={view === "list" ? "sm:flex sm:items-center sm:justify-between" : ""}>
      <CardHeader className={view === "list" ? "flex-1" : ""}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{session.system}</Badge>
          <span className="text-sm text-muted-foreground">
            {formatDate(session.startsAt)} · {formatTime(session.startsAt)}
          </span>
        </div>
        <CardTitle className="mt-1">{session.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Hosted by{" "}
          {gm ? (
            <Link href={`/gm/${gm.id}`} className="font-medium text-foreground hover:underline">
              {gm.name}
            </Link>
          ) : (
            "a Game Master"
          )}{" "}
          · {session.durationHours}h
        </p>
      </CardHeader>
      <CardContent className={view === "list" ? "flex items-center gap-4 sm:pt-6" : "space-y-3"}>
        <div className={view === "list" ? "text-right" : "flex items-center justify-between"}>
          <div className="font-semibold">${session.pricePerSeat}/seat</div>
          <div className={`text-sm ${soldOut ? "text-destructive" : "text-muted-foreground"}`}>
            {soldOut ? "Sold out" : `${session.seatsLeft} of ${session.seatsTotal} seats left`}
          </div>
        </div>
        {soldOut ? (
          <Button variant="outline" disabled className={view === "grid" ? "w-full" : ""}>
            Sold out
          </Button>
        ) : (
          <Link
            href={`/book/${session.id}`}
            className={buttonVariants({ className: view === "grid" ? "w-full" : "" })}
          >
            Book
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export default function EventsPage() {
  const [view, setView] = useState<ViewMode>("grid");
  const [system, setSystem] = useState<GameSystem | "all">("all");

  const sessions = useMemo(() => {
    return [...allSessions]
      .filter((s) => system === "all" || s.system === system)
      .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
  }, [system]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upcoming events</h1>
          <p className="mt-1 text-muted-foreground">
            One-shot sessions you can book right now — no campaign commitment.
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-border p-1">
          <Button
            size="sm"
            variant={view === "grid" ? "secondary" : "ghost"}
            onClick={() => setView("grid")}
          >
            Grid
          </Button>
          <Button
            size="sm"
            variant={view === "list" ? "secondary" : "ghost"}
            onClick={() => setView("list")}
          >
            List
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5">
        <Button
          size="sm"
          variant={system === "all" ? "default" : "outline"}
          onClick={() => setSystem("all")}
        >
          All systems
        </Button>
        {ALL_SYSTEMS.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={system === s ? "default" : "outline"}
            onClick={() => setSystem(s)}
          >
            {s}
          </Button>
        ))}
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {sessions.length} session{sessions.length === 1 ? "" : "s"}
      </p>

      {sessions.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
          No sessions for this system yet. Try another.
        </p>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col gap-3"
          }
        >
          {sessions.map((s) => (
            <EventCard key={s.id} session={s} view={view} />
          ))}
        </div>
      )}
    </main>
  );
}
