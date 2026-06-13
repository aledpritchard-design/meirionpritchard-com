export const dynamic = "force-dynamic";

import { SiteHeader, WorkSection } from "@/components/frame";
import { WorkList } from "@/components/work";
import { WorkModeProvider } from "@/components/work/WorkModeContext";
import { WorkOrderProvider } from "@/components/work/WorkOrderContext";
import type { HslColor, WorkProject } from "@/components/work/types";
import { getSiteSettings } from "@/sanity/queries";

const airEverywhere: WorkProject = {
  brand: "Nike",
  project: "Air Everywhere",
  category: "Campaign",
  date: 2019,
  image: "/images/placeholder.jpg",
  blocks: [
    { type: "photo", variant: "frame" },
    { type: "caption", label: "Intro", size: "lg", text: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy." },
    { type: "photoRow", count: 3, variant: "portrait" },
    { type: "photoRow", count: 2, variant: "square" },
    { type: "photo", variant: "frame" },
    { type: "caption", label: "Section title", size: "lg", text: "The campaign took inspiration from Heron Preston's utilitarian, sustainable brand and combined it with the concept of 360 degrees of air (itself inspired by the shoes's design where the iconic air bubble wrapped up over the foot), literally re-using scraps from Nike's top secret Air bubble factory in Beaverton, OR." },
    { type: "caption", label: "Section title", size: "lg", text: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy." },
    { type: "split", label: "Section title", text: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy.", secondary: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy." },
    { type: "caption", label: "Section title", size: "sm", text: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy. Hosted by Heron himself avid Heron Preston fans and sneaker heads got to work with the materials in-hand and design their very own AirMax 95 or 720." },
    { type: "caption", label: "Section title", size: "sm", text: "The campaign was capped off with a two day Nike By You event at Salone del Mobile in Milan, Italy." },
    { type: "resultsCredits", results: "We reached over 34M people during Milan's Salone Del Mobile.\n2400 members registered for the maker workshops with Heron.\nAll 4000 units sold out in one day on Nike.com.", credits: "Creative Director: Meirion Pritchard\nArt Director: Noah Beckwith\nDigital Designers: Allison Olson, Jana Raport" },
  ],
};

// Seed data from Figma 47:7541 (prototype values — real content comes from Sanity).
// Dates are placeholder values; all non-Air-Everywhere entries reuse the airEverywhere blocks.
const SEED_PROJECTS: WorkProject[] = [
  { brand: "Wallpaper*",     project: "Awards",          category: "Awards",       date: 2016, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "Handmade",        category: "Awards",       date: 2011, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  airEverywhere,
  { brand: "Nike",           project: "Air Sesh",        category: "Campaign",     date: 2020, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Nike",           project: "Member Stories",  category: "Campaign",     date: 2018, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Nike",           project: "Space Hippie",    category: "Campaign",     date: 2021, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Nike",           project: "YCSS",            category: "Campaign",     date: 2017, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "iPad Edition",    category: "Digital",      date: 2010, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Nike",           project: "HH&Bs",           category: "Editorial",    date: 2006, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Nike",           project: "The Roll Out",    category: "Editorial",    date: 2007, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "Director's Cut",  category: "Editorial",    date: 2009, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "Guest Editors 1", category: "Editorial",    date: 2012, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "Guest Editors 2", category: "Editorial",    date: 2013, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "Sound + Vision",  category: "Editorial",    date: 2014, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Bottega Veneta", project: "Araki",           category: "Fashion",      date: 2003, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Bottega Veneta", project: "Viviane Sassen",  category: "Fashion",      date: 2004, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Bottega Veneta", project: "Waiting Game",    category: "Fashion",      date: 2005, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Nike",           project: "Nike By You",     category: "Identity",     date: 2022, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Nike",           project: "One Nike System", category: "Identity",     date: 2023, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Nike",           project: "Swoosh Journal",  category: "Identity",     date: 2024, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "Custom Covers",   category: "Interactive",  date: 2015, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "The Row",        project: "Rebrand",         category: "Logo",         date: 2008, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Victorinox",     project: "Wallpaper* Cuts", category: "Product",      date: 2002, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Bottega Veneta", project: "Art of Collab...", category: "Publication", date: 2001, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "City Guides",     category: "Publication",  date: 2000, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Nike",           project: "Nike Futura",     category: "Typography",   date: 1999, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "Copan",           category: "Typography",   date: 1998, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "Graphik",         category: "Typography",   date: 1997, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
  { brand: "Wallpaper*",     project: "Premio",          category: "Typography",   date: 1996, image: "/images/placeholder.jpg", blocks: airEverywhere.blocks },
];

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
      <WorkOrderProvider>
        <SiteHeader />
        <WorkSection>
          <WorkList projects={SEED_PROJECTS} rampStart={rampStart} rampEnd={rampEnd} />
        </WorkSection>
        <div className="scroll-spacer" aria-hidden="true" />
      </WorkOrderProvider>
    </WorkModeProvider>
  );
}
