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
