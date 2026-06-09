import type { SchemaTypeDefinition } from "sanity";

import { workProject } from "./workProject";

// Schema types registered with Studio. Expanded in A1-12 (full Work model).
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [workProject],
};
