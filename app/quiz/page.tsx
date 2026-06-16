"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GameMaster, GameSystem, PlayStyle, QuizAnswers } from "@/types";
import { gameMasters, ALL_SYSTEMS, ALL_STYLES } from "@/lib/data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ---- Quiz definition -------------------------------------------------------
// Each step writes exactly one field of the shared QuizAnswers contract.

type ExperienceLevel = NonNullable<QuizAnswers["experience"]>;

type BudgetChoice = { label: string; value: number };

const SYSTEM_OPTIONS: { label: string; value: GameSystem }[] = ALL_SYSTEMS.map(
  (s) => ({ label: s, value: s })
);

const STYLE_OPTIONS: { hint: string; value: PlayStyle }[] = [
  { value: "Combat-heavy", hint: "Tactics, builds, epic boss fights" },
  { value: "Roleplay-heavy", hint: "Character drama and story first" },
  { value: "Balanced", hint: "A bit of everything" },
  { value: "Beginner-friendly", hint: "Welcoming, zero judgment" },
  { value: "Horror", hint: "Dread, tension, real stakes" },
  { value: "Sandbox", hint: "Open worlds that react to you" },
];

const EXPERIENCE_OPTIONS: { label: string; hint: string; value: ExperienceLevel }[] = [
  { value: "new", label: "Brand new", hint: "Never played a TTRPG" },
  { value: "some", label: "Some experience", hint: "Played a handful of times" },
  { value: "veteran", label: "Veteran", hint: "I know my way around a character sheet" },
];

const BUDGET_OPTIONS: BudgetChoice[] = [
  { label: "$20 or less", value: 20 },
  { label: "Up to $25", value: 25 },
  { label: "Up to $30", value: 30 },
  { label: "No limit", value: 9999 },
];

const TOTAL_STEPS = 4;

// ---- Matching logic --------------------------------------------------------
// Score every GM against the answers, return the best matches.

function scoreGM(gm: GameMaster, a: QuizAnswers): number {
  let score = 0;

  // System preference is the strongest signal.
  if (a.system && gm.systems.includes(a.system)) score += 50;

  // Vibe / play style.
  if (a.style && gm.styles.includes(a.style)) score += 30;

  // Experience: nudge beginners toward beginner-friendly tables, and
  // veterans toward crunchier/sandbox tables.
  if (a.experience === "new" && gm.styles.includes("Beginner-friendly")) score += 20;
  if (
    a.experience === "veteran" &&
    (gm.styles.includes("Combat-heavy") || gm.styles.includes("Sandbox"))
  ) {
    score += 12;
  }

  // Budget: within budget is a plus, over budget is a penalty (not a hard cut).
  if (a.budget != null) {
    if (gm.pricePerSession <= a.budget) score += 15;
    else score -= 25;
  }

  // Quality tiebreaker so good GMs float up when signals are weak.
  score += gm.rating * 2;

  return score;
}

function recommend(a: QuizAnswers): GameMaster[] {
  return [...gameMasters]
    .map((gm) => ({ gm, score: scoreGM(gm, a) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map((x) => x.gm);
}

// ---- Small presentational pieces ------------------------------------------

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-all duration-300"
        style={{ width: `${value}%` }}
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  title,
  hint,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "w-full rounded-lg border p-4 text-left transition-all",
        selected
          ? "border-primary bg-primary/10 ring-2 ring-primary/40"
          : "border-border bg-background hover:bg-muted",
      ].join(" ")}
    >
      <div className="font-medium">{title}</div>
      {hint ? <div className="mt-0.5 text-sm text-muted-foreground">{hint}</div> : null}
    </button>
  );
}

function RecCard({ gm, rank }: { gm: GameMaster; rank: number }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gm.avatarUrl}
          alt={gm.name}
          className="size-14 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <CardTitle className="truncate">{gm.name}</CardTitle>
            {rank === 1 ? <Badge>Top match</Badge> : null}
          </div>
          <p className="truncate text-sm text-muted-foreground">{gm.tagline}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {gm.systems.map((s) => (
            <Badge key={s} variant="secondary">
              {s}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            ⭐ {gm.rating.toFixed(1)} ({gm.reviewsCount})
          </span>
          <span className="font-semibold">From ${gm.pricePerSession}/session</span>
        </div>
        <Link href={`/gm/${gm.id}`} className={buttonVariants({ className: "w-full" })}>
          View profile
        </Link>
      </CardContent>
    </Card>
  );
}

// ---- Page ------------------------------------------------------------------

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [done, setDone] = useState(false);

  const recommendations = useMemo(
    () => (done ? recommend(answers) : []),
    [done, answers]
  );

  function set<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  const canAdvance = (() => {
    switch (step) {
      case 0:
        return answers.system != null;
      case 1:
        return answers.style != null;
      case 2:
        return answers.experience != null;
      case 3:
        return answers.budget != null;
      default:
        return false;
    }
  })();

  function next() {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else setDone(true);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  // ---- Results view --------------------------------------------------------
  if (done) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Your matches are in 🎲</h1>
          <p className="mt-2 text-muted-foreground">
            Based on {answers.system}, a {answers.style?.toLowerCase()} vibe, and a{" "}
            {answers.budget === 9999 ? "flexible" : `$${answers.budget}`} budget.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((gm, i) => (
            <RecCard key={gm.id} gm={gm} rank={i + 1} />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={restart}>
            Retake quiz
          </Button>
          <Link href="/" className={buttonVariants()}>
            Browse all GMs
          </Link>
        </div>
      </main>
    );
  }

  // ---- Stepper view --------------------------------------------------------
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Find your game</h1>
        <p className="mt-1 text-muted-foreground">
          Answer {TOTAL_STEPS} quick questions and we&apos;ll match you with a GM.
        </p>
      </div>

      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Step {step + 1} of {TOTAL_STEPS}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 0 && "Which system do you want to play?"}
            {step === 1 && "What's your ideal vibe?"}
            {step === 2 && "How much experience do you have?"}
            {step === 3 && "What's your budget per session?"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {step === 0 &&
              SYSTEM_OPTIONS.map((o) => (
                <OptionButton
                  key={o.value}
                  title={o.label}
                  selected={answers.system === o.value}
                  onClick={() => set("system", o.value)}
                />
              ))}

            {step === 1 &&
              STYLE_OPTIONS.map((o) => (
                <OptionButton
                  key={o.value}
                  title={o.value}
                  hint={o.hint}
                  selected={answers.style === o.value}
                  onClick={() => set("style", o.value)}
                />
              ))}

            {step === 2 &&
              EXPERIENCE_OPTIONS.map((o) => (
                <OptionButton
                  key={o.value}
                  title={o.label}
                  hint={o.hint}
                  selected={answers.experience === o.value}
                  onClick={() => set("experience", o.value)}
                />
              ))}

            {step === 3 &&
              BUDGET_OPTIONS.map((o) => (
                <OptionButton
                  key={o.value}
                  title={o.label}
                  selected={answers.budget === o.value}
                  onClick={() => set("budget", o.value)}
                />
              ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button variant="ghost" onClick={back} disabled={step === 0}>
          Back
        </Button>
        <Button onClick={next} disabled={!canAdvance}>
          {step === TOTAL_STEPS - 1 ? "See my matches" : "Next"}
        </Button>
      </div>
    </main>
  );
}
