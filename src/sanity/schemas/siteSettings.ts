import { defineField, defineType } from "sanity";

const hslFields = [
  defineField({ name: "h", title: "Hue (0–360)", type: "number" }),
  defineField({ name: "s", title: "Saturation %", type: "number" }),
  defineField({ name: "l", title: "Lightness %", type: "number" }),
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "rampStart",
      title: "Solid Ramp – Start Colour (HSL)",
      description: "First-row colour in solid image mode (D015). Defaults: h=345 s=40 l=50.",
      type: "object",
      fields: hslFields,
    }),
    defineField({
      name: "rampEnd",
      title: "Solid Ramp – End Colour (HSL)",
      description: "Last-row colour in solid image mode (D015). Defaults: h=189 s=74 l=62.",
      type: "object",
      fields: hslFields,
    }),
    defineField({
      name: "gradientBackdrop",
      title: "Gradient Backdrop",
      description: "Full-page background image for gradient backdrop mode.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
