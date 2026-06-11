export const dynamic = "force-dynamic";

import { SiteHeader, WorkSection } from "@/components/frame";
import { WorkList } from "@/components/work";
import { WorkModeProvider } from "@/components/work/WorkModeContext";
import type { HslColor, WorkProject } from "@/components/work/types";
import { getSiteSettings } from "@/sanity/queries";

const closedRow: WorkProject = { title: "Wallpaper*", category: "Awards", value: "360°" };
const airEverywhere: WorkProject = {
  title: "Air Everywhere", category: "Nike", value: "Campaign",
  image: "/images/placeholder.jpg",
  blocks: [
    { type: "photo", variant: "frame" },
    { type: "caption", label: "Intro", size: "lg", text: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy." },
    { type: "photoRow", count: 3, variant: "portrait" },
    { type: "photoRow", count: 2, variant: "square" },
    { type: "photo", variant: "frame" },
    { type: "caption", label: "Section title", size: "lg", text: "The campaign took inspiration from Heron Preston's utilitarian, sustainable brand..." },
    { type: "caption", label: "Section title", size: "lg", text: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy." },
    { type: "split", label: "Section title", text: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy.", secondary: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy." },
    { type: "caption", label: "Section title", size: "sm", text: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy. Hosted by Heron himself avid Heron Preston fans and sneaker heads got to work with the materials in-hand and design their very own AirMax 95 or 720." },
    { type: "caption", label: "Section title", size: "sm", text: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy." },
    { type: "resultsCredits", results: "We reached over 34M people during Milan's Salone Del Mobile.\n2400 members registered for the maker workshops with Heron.\nAll 4000 units sold out in one day on Nike.com.", credits: "Creative Director: Meirion Pritchard\nArt Director: Noah Beckwith\nDigital Designers: Allison Olson, Jana Raport" }
  ]
};
const SEED_PROJECTS: WorkProject[] = [closedRow, closedRow, closedRow, closedRow, airEverywhere, closedRow, closedRow];

// Fallback to prototype token values (D015) when siteSettings hasn't been published yet.
const DEFAULT_RAMP_START: HslColor = { h: 345, s: 40, l: 50 };
const DEFAULT_RAMP_END: HslColor = { h: 189, s: 74, l: 62 };

export default async function Home() {
  const settings = await getSiteSettings();
  const rampStart: HslColor = {
    h: settings?.rampStart?.h ?? DEFAULT_RAMP_START.h,
    s: settings?.rampStart?.s ?? DEFAULT_RAMP_START.s,
    l: settings?.rampStart?.l ?? DEFAULT_RAMP_START.l,
  };
  const rampEnd: HslColor = {
    h: settings?.rampEnd?.h ?? DEFAULT_RAMP_END.h,
    s: settings?.rampEnd?.s ?? DEFAULT_RAMP_END.s,
    l: settings?.rampEnd?.l ?? DEFAULT_RAMP_END.l,
  };

  return (
    <WorkModeProvider>
      <SiteHeader />
      <WorkSection>
        <WorkList projects={SEED_PROJECTS} rampStart={rampStart} rampEnd={rampEnd} />
      </WorkSection>
      <div className="scroll-spacer" aria-hidden="true" />
    </WorkModeProvider>
  );
}
