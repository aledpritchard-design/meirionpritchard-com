import type { StructureResolver } from "sanity/structure";

// Minimal Studio structure for the foundation scaffold (A1-9). The full
// content tree — categories, the case-study block library, siteSettings —
// is built in A1-12.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([S.documentTypeListItem("workProject").title("Work projects")]);
