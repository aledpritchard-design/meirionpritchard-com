import { defineQuery } from "next-sanity";

import { client } from "./client";

// Foundation smoke-test query. Real Work queries (sorting, the block body,
// siteSettings) arrive with the content model in A1-12.
export const WORK_PROJECTS_QUERY = defineQuery(`
  *[_type == "workProject"] | order(brand asc) { _id, brand, project }
`);

export async function getWorkProjects() {
  return client.fetch(WORK_PROJECTS_QUERY);
}

// siteSettings singleton — ramp endpoints for solid image mode (A1-21).
// Returns null when the document hasn't been published in the CMS yet;
// callers fall back to the design-token defaults.
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    rampStart { h, s, l },
    rampEnd { h, s, l }
  }
`);

export async function getSiteSettings() {
  return client.fetch(SITE_SETTINGS_QUERY);
}
