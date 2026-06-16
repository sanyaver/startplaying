import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import {
  buildMetadata,
  jsonLd,
  organizationLd,
  sampleProductLd,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about booking tabletop RPG sessions with professional Game Masters on StartPlaying — pricing, refunds, beginners, online play and more.",
  path: "/faq",
});

type QA = { question: string; answer: string };

const FAQS: QA[] = [
  {
    question: "What is StartPlaying?",
    answer:
      "StartPlaying is an online marketplace that connects players with professional Game Masters (GMs) running paid tabletop roleplaying games. Browse GMs, read reviews, and book a seat in a live session for systems like D&D 5e, Pathfinder 2e, and Call of Cthulhu.",
  },
  {
    question: "Do I need any experience to play?",
    answer:
      "Not at all. Many of our GMs specialize in beginner-friendly tables and will teach you the rules as you go. Filter for the “Beginner-friendly” play style to find a game built for first-timers — bring nothing but curiosity and your GM handles the rest.",
  },
  {
    question: "How much does it cost to play?",
    answer:
      "Each GM sets their own price per seat, typically between $15 and $35 per session. The exact price is shown on every session listing before you book, so there are never any surprises. Many GMs offer lower-cost intro one-shots so you can try a table before committing to a campaign.",
  },
  {
    question: "What do I need to join an online game?",
    answer:
      "A computer or tablet with a stable internet connection, a webcam and microphone (optional but encouraged for roleplay), and a quiet space. Your GM will share which virtual tabletop and voice tools they use — no software purchases are required to get started.",
  },
  {
    question: "What's the difference between a one-shot and a campaign?",
    answer:
      "A one-shot is a complete, self-contained adventure that wraps up in a single session — perfect for trying a system or a GM. A campaign is an ongoing story told across many sessions with the same group, where your characters grow and your choices shape the world over time.",
  },
  {
    question: "Can I cancel or reschedule a booking?",
    answer:
      "Yes. You can cancel from your bookings page, and most sessions are eligible for a full refund when cancelled at least 24 hours before the start time. Cancellation and refund windows are set per GM and are shown at checkout before you confirm payment.",
  },
  {
    question: "How are Game Masters vetted?",
    answer:
      "Every GM has a public profile with verified player reviews, ratings, the systems they run, and their play styles. Ratings come only from players who have completed a session, so the feedback you read reflects real games at that table.",
  },
  {
    question: "Is StartPlaying safe and welcoming for everyone?",
    answer:
      "Yes. We expect every table to use safety tools and to be inclusive of players of all backgrounds and experience levels. Many GMs explicitly run safety-tools-first, LGBTQ+ friendly tables — look for it in their bio and play styles.",
  },
  {
    question: "How do I become a Game Master on StartPlaying?",
    answer:
      "If you love running games, you can apply to list your own sessions, set your schedule and pricing, and build a player base. Create a GM profile describing the systems you run and your style, and start accepting bookings once you're approved.",
  },
];

// FAQPage structured data built from the same source as the visible Q&As.
function faqPageLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export default function FaqPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      {/* JSON-LD: FAQPage + Organization + a sample Product/Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(sampleProductLd()) }}
      />

      <header className="mb-10 sm:mb-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
          Help Center
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-300">
          Everything you need to know about finding a Game Master and booking
          your first tabletop RPG session.
        </p>
      </header>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {FAQS.map((faq) => (
          <details key={faq.question} className="group py-2">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-lg font-medium text-zinc-100 transition-colors hover:text-indigo-400 [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <ChevronDown
                aria-hidden
                className="size-5 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="pb-5 pr-9 text-base leading-7 text-zinc-300">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      <p className="mt-12 text-center text-zinc-400">
        Still have questions?{" "}
        <a
          href="mailto:support@startplaying.games"
          className="font-medium text-indigo-400 underline-offset-4 hover:underline"
        >
          Contact our support team
        </a>
        .
      </p>
    </main>
  );
}
