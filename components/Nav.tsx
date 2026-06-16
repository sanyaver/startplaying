import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const links = [
  { href: "/", label: "Browse GMs" },
  { href: "/events", label: "Events" },
  { href: "/quiz", label: "Find a Game" },
  { href: "/faq", label: "FAQ" },
];

export default async function Nav() {
  const { userId } = await auth();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b12]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-2xl">🎲</span>
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            StartPlaying
          </span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-300 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {userId ? (
            <>
              <Link
                href="/quiz"
                className="hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-transform hover:scale-105 sm:block"
              >
                Find my game
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="hidden text-sm font-medium text-zinc-300 transition-colors hover:text-white sm:block">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-transform hover:scale-105">
                  Sign up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0b0b12] px-4 py-8 text-sm text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© 2026 StartPlaying — the marketplace for tabletop RPG game masters.</p>
        <div className="flex gap-5">
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
