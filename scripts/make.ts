import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const usage = "使い方: bun run make";

if (process.argv.length > 2) {
  console.error(usage);
  process.exit(1);
}

const dateParts = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).formatToParts(new Date());
const date = Object.fromEntries(
  dateParts
    .filter(({ type }) => type !== "literal")
    .map(({ type, value }) => [type, value]),
);
const fileDate = `${date.year}${date.month}${date.day}`;
const metadataDate = `${date.year}-${date.month}-${date.day}`;

const blogDirectory = join(import.meta.dirname, "../src/content/blog");
const paths = [
  join(blogDirectory, "ja", `${fileDate}.mdx`),
  join(blogDirectory, "en", `${fileDate}.mdx`),
];
const existingPath = paths.find(existsSync);

if (existingPath) {
  console.error(`既にファイルが存在します: ${existingPath}`);
  process.exit(1);
}

const content = `---
title: ""
description: ""
date: ${metadataDate}
---

import Link from "@/components/Link.astro";
import LinkCard from "@/components/LinkCard.astro";
import Marker from "@/components/Marker.astro";

私。
`;

for (const path of paths) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, { encoding: "utf8", flag: "wx" });
}

console.log(paths.join("\n"));
