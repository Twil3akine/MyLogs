import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const article = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/article" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    platform: z.enum(["AtCoder", "Codeforces", "Library", "Other"]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  article,
};
