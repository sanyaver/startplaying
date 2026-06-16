import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Nav, { Footer } from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://startplaying.vercel.app"),
  title: {
    default: "StartPlaying — Book Professional Tabletop RPG Game Masters",
    template: "%s | StartPlaying",
  },
  description:
    "The marketplace for tabletop role-playing games. Browse professional Game Masters, filter by system, style, and schedule, and book your next D&D, Pathfinder, or Call of Cthulhu session.",
  keywords: ["tabletop RPG", "D&D game master", "hire a GM", "Pathfinder", "online D&D", "book a game master"],
  openGraph: {
    title: "StartPlaying — Book Professional Tabletop RPG Game Masters",
    description: "Browse pro GMs, filter by system & style, book a session in minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-[#0b0b12] text-zinc-100">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
