import { SiteNav } from "./SiteNav";
import { HeroBar } from "./HeroBar";
import { NavControls } from "./NavControls";

export function SiteHeader() {
  return (
    <header className="s-header">
      <SiteNav />
      <HeroBar />
      <NavControls />
    </header>
  );
}
