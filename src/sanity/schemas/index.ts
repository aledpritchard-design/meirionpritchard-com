import type { SchemaTypeDefinition } from "sanity";

import { workProject } from "./workProject";
import { siteSettings } from "./siteSettings";

// Schema types registered with Studio. Expanded in A1-12 (full Work model).
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [workProject, siteSettings],
};
