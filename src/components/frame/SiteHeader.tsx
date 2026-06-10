import { SiteNav } from "./SiteNav";
import { HeroBar } from "./HeroBar";
import { NavTabs } from "./NavTabs";

export function SiteHeader() {
  return (
    <header className="s-header">
      <SiteNav />
      <HeroBar />
      <NavTabs items={[{ label: "Work" }, { label: "About" }]} />
      <NavTabs items={[{ label: "Articles" }, { label: "Contact" }]} />
    </header>
  );
}
