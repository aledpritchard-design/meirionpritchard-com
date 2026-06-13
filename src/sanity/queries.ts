import { defineQuery } from "next-sanity";

import { client } from "./client";
import type { WorkProject, Block, PhotoRowBlock } from "@/components/work/types";

// ---------------------------------------------------------------------------
// GROQ queries
// ---------------------------------------------------------------------------

export const WORK_PROJECTS_QUERY = defineQuery(`
  *[_type == "workProject"] | order(date desc) {
    _id,
    brand,
    project,
    category,
    date,
    "image": image.asset->url,
    blocks[] {
      "type": _type,
      variant,
      label,
      size,
      text,
      secondary,
      results,
      credits,
      "image": image.asset->url,
      "images": images[].asset->url
    }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    rampStart { h, s, l },
    rampEnd { h, s, l },
    "gradientBackdrop": gradientBackdrop.asset->url
  }
`);

// ---------------------------------------------------------------------------
// Type mapping (GROQ nullable fields → clean frontend types)
// ---------------------------------------------------------------------------

type RawBlock = {
  type: string | null;
  variant: string | null;
  label: string | null;
  size: string | null;
  text: string | null;
  secondary: string | null;
  results: string | null;
  credits: string | null;
  image: string | null;
  images: (string | null)[] | null;
};

function mapBlock(raw: RawBlock): Block | null {
  switch (raw.type) {
    case "photo":
      return {
        type: "photo",
        variant: "frame",
        image: raw.image ?? undefined,
      };
    case "photoRow":
      return {
        type: "photoRow",
        variant: (raw.variant as PhotoRowBlock["variant"]) ?? "portrait",
        images: (raw.images?.filter((u): u is string => u !== null)) ?? [],
      };
    case "caption":
      return {
        type: "caption",
        label: raw.label ?? "",
        size: (raw.size as "lg" | "sm") ?? "lg",
        text: raw.text ?? "",
      };
    case "split":
      return {
        type: "split",
        label: raw.label ?? "",
        text: raw.text ?? "",
        secondary: raw.secondary ?? "",
        image: raw.image ?? undefined,
      };
    case "resultsCredits":
      return {
        type: "resultsCredits",
        results: raw.results ?? "",
        credits: raw.credits ?? "",
      };
    default:
      return null;
  }
}

type RawProject = {
  _id: string;
  brand: string | null;
  project: string | null;
  category: string | null;
  date: string | null;
  image: string | null;
  blocks: RawBlock[] | null;
};

function mapProject(raw: RawProject): WorkProject | null {
  if (!raw.brand || !raw.project || !raw.category) return null;
  return {
    _id: raw._id,
    brand: raw.brand,
    project: raw.project,
    category: raw.category,
    date: raw.date ?? undefined,
    image: raw.image ?? undefined,
    blocks: raw.blocks
      ? raw.blocks.map(mapBlock).filter((b): b is Block => b !== null)
      : undefined,
  };
}

// ---------------------------------------------------------------------------
// Fetch helpers
// ---------------------------------------------------------------------------

export async function getWorkProjects(): Promise<WorkProject[]> {
  const raw = await client.fetch<RawProject[]>(
    WORK_PROJECTS_QUERY,
    {},
    { next: { tags: ["workProject"] } },
  );
  return raw.map(mapProject).filter((p): p is WorkProject => p !== null);
}

export async function getSiteSettings() {
  return client.fetch(
    SITE_SETTINGS_QUERY,
    {},
    { next: { tags: ["siteSettings"] } },
  );
}
