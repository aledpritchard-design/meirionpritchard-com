import { SiteHeader, WorkSection } from "@/components/frame";
import { WorkList } from "@/components/work";
import type { WorkProject } from "@/components/work/types";

const closedRow: WorkProject = { title: "Wallpaper*", category: "Awards", value: "360°" };
const airEverywhere: WorkProject = {
  title: "Air Everywhere", category: "Nike", value: "Campaign",
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

export default function Home() {
  return (
    <>
      <SiteHeader />
      <WorkSection>
        <WorkList projects={SEED_PROJECTS} />
      </WorkSection>
    </>
  );
}
