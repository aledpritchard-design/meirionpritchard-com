import Link from "next/link";

import { getWorkProjects } from "@/sanity/queries";

// A1-9 foundation smoke test: fetch documents from Sanity and render them,
// proving Next ↔ Sanity talk end to end. The real Work index — the list, the
// nav, and all the prototype interactions — is built in A1-10 → A1-12. Live
// fetch so Studio edits show immediately on staging; caching is tuned later.
export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getWorkProjects();

  return (
    <main style={{ padding: "2rem", fontFamily: "ui-monospace, monospace" }}>
      <h1>Meirion Pritchard — foundation scaffold</h1>
      <p>
        Sanity → Next render check: {projects.length} document
        {projects.length === 1 ? "" : "s"} from the CMS.
      </p>
      <ul>
        {projects.map((p) => (
          <li key={p._id}>
            {p.brand} — {p.project}
          </li>
        ))}
      </ul>
      <p>
        <Link href="/studio">Open Studio →</Link>
      </p>
    </main>
  );
}
