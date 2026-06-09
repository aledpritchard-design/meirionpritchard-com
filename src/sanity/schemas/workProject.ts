import { defineField, defineType } from "sanity";

// Minimal scaffold stub, just enough to prove the CMS pipeline end to end
// (A1-9). The full Work content model — category, date, hover image, and the
// block-based case-study body, plus the siteSettings singleton — is defined
// in A1-12. Keep this minimal so it doesn't pre-empt that schema work.
export const workProject = defineType({
  name: "workProject",
  title: "Work project",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "project",
      title: "Project",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "project", subtitle: "brand" },
  },
});
