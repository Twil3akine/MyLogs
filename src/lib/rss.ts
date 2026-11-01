export type FeedLocale = "ja" | "en";

export interface FeedItem {
  title: string;
  description: string;
  publishedAt: Date;
  path: string;
}

interface FeedOptions {
  site: URL;
  locale: FeedLocale;
  items: FeedItem[];
}

function escapeXml(value: string): string {
  // XML 1.0 で許可されない制御文字や不正なサロゲートを除外する。
  return Array.from(value)
    .filter((character) => {
      const codePoint = character.codePointAt(0)!;
      return (
        codePoint === 0x9 ||
        codePoint === 0xa ||
        codePoint === 0xd ||
        (codePoint >= 0x20 && codePoint <= 0xd7ff) ||
        (codePoint >= 0xe000 && codePoint <= 0xfffd) ||
        (codePoint >= 0x10000 && codePoint <= 0x10ffff)
      );
    })
    .join("")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateRssXml({ site, locale, items }: FeedOptions): string {
  const feedUrl = new URL(locale === "ja" ? "/rss.xml" : "/en/rss.xml", site).href;
  const homeUrl = new URL(locale === "ja" ? "/" : "/en/", site).href;
  const description = locale === "ja"
    ? "競技プログラミング、個人開発、日々の学びに関する記事とブログ。"
    : "Articles and blog posts about competitive programming, projects, and daily learning.";

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Twil3akine | Article &amp; Blog</title>",
    `    <link>${escapeXml(homeUrl)}</link>`,
    `    <description>${escapeXml(description)}</description>`,
    `    <language>${locale}</language>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
  ];

  const sortedItems = [...items].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime() || a.path.localeCompare(b.path),
  );

  for (const item of sortedItems) {
    const url = escapeXml(new URL(item.path, site).href);
    lines.push(
      "    <item>",
      `      <title>${escapeXml(item.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${item.publishedAt.toUTCString()}</pubDate>`,
      `      <description>${escapeXml(item.description)}</description>`,
      "    </item>",
    );
  }

  lines.push("  </channel>", "</rss>");
  return `${lines.join("\n")}\n`;
}
