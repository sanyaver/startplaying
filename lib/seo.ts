import type { Metadata } from "next";
import { gameMasters } from "@/lib/data";

// Centralized SEO/GEO config. Owned by the content-seo agent.
// NOTE: app/layout.tsx is owned by another agent, so per-page metadata is
// exported from each page and `metadataBase` is set here on every page.

export const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://startplaying.games"
).replace(/\/$/, "");

export const SITE = {
  name: "StartPlaying",
  legalName: "StartPlaying Games",
  url: BASE_URL,
  description:
    "StartPlaying is the marketplace to find professional Game Masters and book live tabletop RPG sessions — D&D 5e, Pathfinder 2e, Call of Cthulhu and more. Beginner-friendly, every experience level welcome.",
  twitter: "@startplaying",
  ogImageAlt: "StartPlaying — find your next tabletop RPG adventure",
} as const;

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/faq". Used for canonical + OG url. */
  path: string;
};

/**
 * Builds a consistent Metadata object (title, description, canonical,
 * OpenGraph, Twitter) for a route. Relies on the root-level
 * app/opengraph-image.tsx for the default share image.
 */
export function buildMetadata({
  title,
  description,
  path,
}: BuildMetadataArgs): Metadata {
  const url = `${BASE_URL}${path}`;
  // The root layout (orchestrator-owned) defines a `%s | StartPlaying` title
  // template, so the page title stays unbranded to avoid doubling. OpenGraph /
  // Twitter titles are not affected by the template, so we brand them here.
  const fullTitle = `${title} | ${SITE.name}`;
  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: fullTitle,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      title: fullTitle,
      description,
    },
  };
}

/** Serialize a JSON-LD object safely for inline injection (XSS-safe). */
export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** schema.org Organization describing the marketplace. */
export function organizationLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    description: SITE.description,
    sameAs: [
      "https://twitter.com/startplaying",
      "https://www.instagram.com/startplaying.games",
    ],
  };
}

/**
 * A sample schema.org Product/Offer built from real seed data — represents a
 * bookable Game Master session listing on the marketplace.
 */
export function sampleProductLd(): Record<string, unknown> {
  const gm = gameMasters[0];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Tabletop RPG sessions with ${gm.name}`,
    image: gm.avatarUrl,
    description: gm.bio,
    brand: { "@type": "Brand", name: SITE.name },
    category: gm.systems.join(", "),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: gm.rating,
      reviewCount: gm.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      price: gm.pricePerSession,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/gm/${gm.id}`,
    },
  };
}
