import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const article = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/article" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().default(false),
    platform: z.enum(["AtCoder", "Codeforces", "Library", "Other"]).default("Other"),
    category: z.string().default("Article"),
    tags: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().default(false),
    category: z.string().default("Blog"),
    tags: z.array(z.string()).default([]),
  }),
});

const profile = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/profile" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lead: z.string(),
  }),
});

export const collections = {
  article,
  blog,
  profile,
};
