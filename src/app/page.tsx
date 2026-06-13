import { SiteHeader, WorkSection } from "@/components/frame";
import { WorkList } from "@/components/work";
import { WorkModeProvider } from "@/components/work/WorkModeContext";
import type { HslColor } from "@/components/work/types";
import { getWorkProjects, getSiteSettings } from "@/sanity/queries";

// Fallback to prototype token values (D015) when siteSettings hasn't been published yet.
const DEFAULT_RAMP_START: HslColor = { h: 345, s: 40, l: 50 };
const DEFAULT_RAMP_END: HslColor = { h: 189, s: 74, l: 62 };

export default async function Home() {
  const [projects, settings] = await Promise.all([
    getWorkProjects(),
    getSiteSettings(),
  ]);

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
        <WorkList projects={projects} rampStart={rampStart} rampEnd={rampEnd} />
      </WorkSection>
      <div className="scroll-spacer" aria-hidden="true" />
    </WorkModeProvider>
  );
}
