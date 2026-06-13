import { defineField, defineType, defineArrayMember } from "sanity";

const CATEGORY_OPTIONS = [
  "Campaign", "Editorial", "Fashion", "Identity", "Typography",
  "Publication", "Digital", "Logo", "Product", "Interactive", "360°",
].map((v) => ({ title: v, value: v }));

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
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: CATEGORY_OPTIONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Year",
      type: "date",
      options: { dateFormat: "YYYY" },
    }),
    defineField({
      name: "image",
      title: "Hover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "blocks",
      title: "Case study blocks",
      type: "array",
      of: [
        defineArrayMember({
          name: "photo",
          title: "Photo",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "variant",
              title: "Variant",
              type: "string",
              initialValue: "frame",
              options: { list: [{ title: "Frame", value: "frame" }] },
            }),
          ],
          preview: {
            select: { title: "variant" },
            prepare: (s) => ({ title: `Photo – ${s.title ?? "frame"}` }),
          },
        }),
        defineArrayMember({
          name: "photoRow",
          title: "Photo row",
          type: "object",
          fields: [
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
            }),
            defineField({
              name: "variant",
              title: "Variant",
              type: "string",
              options: {
                list: [
                  { title: "Portrait", value: "portrait" },
                  { title: "Square", value: "square" },
                  { title: "Tall", value: "tall" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "variant" },
            prepare: (s) => ({ title: `Photo row – ${s.title ?? ""}` }),
          },
        }),
        defineArrayMember({
          name: "caption",
          title: "Caption",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              options: {
                list: [
                  { title: "Large", value: "lg" },
                  { title: "Small", value: "sm" },
                ],
              },
            }),
            defineField({ name: "text", title: "Text", type: "text" }),
          ],
          preview: {
            select: { title: "label", subtitle: "text" },
          },
        }),
        defineArrayMember({
          name: "split",
          title: "Split",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text" }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "secondary", title: "Secondary text", type: "text" }),
          ],
          preview: {
            select: { title: "label", subtitle: "text" },
          },
        }),
        defineArrayMember({
          name: "resultsCredits",
          title: "Results & credits",
          type: "object",
          fields: [
            defineField({ name: "results", title: "Results", type: "text" }),
            defineField({ name: "credits", title: "Credits", type: "text" }),
          ],
          preview: {
            prepare: () => ({ title: "Results & credits" }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "project", subtitle: "brand" },
  },
});
