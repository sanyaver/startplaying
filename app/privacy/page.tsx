import type { Metadata } from "next";
import { buildMetadata, SITE } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How StartPlaying collects, uses, and protects your personal information when you browse Game Masters and book tabletop RPG sessions.",
  path: "/privacy",
});

const LAST_UPDATED = "June 16, 2026";

type Section = { heading: string; body: string[] };

const SECTIONS: Section[] = [
  {
    heading: "1. Information we collect",
    body: [
      "We collect information you provide directly to us — such as your name, email address, and profile details — when you create an account, book a session, or contact support.",
      "We also collect limited technical information automatically, including your device type, browser, and pages viewed, to keep the service secure and improve your experience.",
    ],
  },
  {
    heading: "2. How we use your information",
    body: [
      "We use your information to operate the marketplace: to connect you with Game Masters, process bookings and payments, send booking confirmations and service updates, and provide customer support.",
      "We never sell your personal information. We do not use the content of your private game communications for advertising.",
    ],
  },
  {
    heading: "3. Sharing with Game Masters",
    body: [
      "When you book a session, we share the details necessary to host your game — typically your display name and the session you booked — with that Game Master. Game Masters are independent and are expected to handle your information responsibly.",
    ],
  },
  {
    heading: "4. Payments",
    body: [
      "Payments are handled by our third-party payment processor. We do not store full card numbers on our servers. The processor's handling of your payment data is governed by its own privacy policy.",
    ],
  },
  {
    heading: "5. Cookies",
    body: [
      "We use cookies and similar technologies to keep you signed in, remember your preferences, and understand how the service is used. You can control cookies through your browser settings, though some features may not work without them.",
    ],
  },
  {
    heading: "6. Data retention & security",
    body: [
      "We retain your information for as long as your account is active or as needed to provide the service and meet legal obligations. We use industry-standard safeguards to protect your data, though no method of transmission over the internet is fully secure.",
    ],
  },
  {
    heading: "7. Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct, export, or delete your personal information. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    heading: "8. Children",
    body: [
      "StartPlaying is not directed to children under 13, and we do not knowingly collect personal information from them. Players under 18 should use the service only with the involvement of a parent or guardian.",
    ],
  },
  {
    heading: "9. Changes to this policy",
    body: [
      "We may update this policy from time to time. When we make material changes, we will revise the “last updated” date above and, where appropriate, notify you.",
    ],
  },
  {
    heading: "10. Contact us",
    body: [
      "Questions about this policy? Email us at privacy@startplaying.games and we’ll be happy to help.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Last updated {LAST_UPDATED}
        </p>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          This policy explains how {SITE.legalName} collects, uses, and protects
          your information when you use our tabletop RPG marketplace.
        </p>
      </header>

      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-sm text-zinc-500 dark:text-zinc-400">
        This document is a sample privacy policy for a demo marketplace and does
        not constitute legal advice.
      </p>
    </main>
  );
}
