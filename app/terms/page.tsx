import type { Metadata } from "next";
import { buildMetadata, SITE } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms and conditions for using StartPlaying to discover Game Masters and book tabletop RPG sessions.",
  path: "/terms",
});

const LAST_UPDATED = "June 16, 2026";

type Section = { heading: string; body: string[] };

const SECTIONS: Section[] = [
  {
    heading: "1. Acceptance of terms",
    body: [
      "By accessing or using StartPlaying, you agree to these Terms of Service. If you do not agree, please do not use the service.",
    ],
  },
  {
    heading: "2. The marketplace",
    body: [
      "StartPlaying is a marketplace that connects players with independent Game Masters who run paid tabletop roleplaying sessions. We provide the platform; Game Masters are responsible for the games they host.",
      "We are not a party to the game itself and do not guarantee any particular gameplay experience.",
    ],
  },
  {
    heading: "3. Accounts",
    body: [
      "You must provide accurate information when creating an account and are responsible for keeping your credentials secure and for all activity under your account. You must be at least 13 years old to use the service.",
    ],
  },
  {
    heading: "4. Bookings & payments",
    body: [
      "When you book a session, you agree to pay the listed price per seat. Prices are set by each Game Master and shown before you confirm. Payment is collected at checkout through our payment processor.",
      "A booking is confirmed once payment is completed and seats are available.",
    ],
  },
  {
    heading: "5. Cancellations & refunds",
    body: [
      "Cancellation and refund eligibility are shown at checkout and may vary by Game Master. As a general rule, sessions cancelled at least 24 hours before the start time are eligible for a full refund. Game Masters may cancel a session, in which case affected players receive a full refund.",
    ],
  },
  {
    heading: "6. Code of conduct",
    body: [
      "You agree to treat Game Masters and other players with respect, to follow each table’s safety tools and house rules, and not to harass, discriminate against, or harm others. We may suspend or remove accounts that violate this code.",
    ],
  },
  {
    heading: "7. Game Master responsibilities",
    body: [
      "Game Masters agree to accurately describe their sessions, run games as advertised, maintain a safe and inclusive table, and honor their stated cancellation policy.",
    ],
  },
  {
    heading: "8. Content",
    body: [
      "You retain ownership of content you submit, such as reviews and profile information, and grant us a license to display it in connection with the service. Do not post content that is unlawful, infringing, or abusive.",
    ],
  },
  {
    heading: "9. Disclaimers & limitation of liability",
    body: [
      "The service is provided “as is” without warranties of any kind. To the fullest extent permitted by law, StartPlaying is not liable for indirect or consequential damages arising from your use of the service.",
    ],
  },
  {
    heading: "10. Changes & contact",
    body: [
      "We may update these terms from time to time; continued use after changes means you accept the updated terms. Questions? Email legal@startplaying.games.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-10 border-b border-white/10 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          Last updated {LAST_UPDATED}
        </p>
        <p className="mt-4 text-lg text-zinc-300">
          These terms govern your use of {SITE.legalName} and the booking of
          tabletop RPG sessions through our marketplace.
        </p>
      </header>

      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3 text-base leading-7 text-zinc-300">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-sm text-zinc-500">
        This document is a sample terms of service for a demo marketplace and
        does not constitute legal advice.
      </p>
    </main>
  );
}
