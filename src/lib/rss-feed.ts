import { getCollection } from "astro:content";
import { getLocalizedSlugPath, isListedPost, isPostLocale } from "./content";
import { generateRssXml, type FeedItem, type FeedLocale } from "./rss";

export async function createRssResponse(locale: FeedLocale, site: URL | undefined): Promise<Response> {
  if (!site) {
    throw new Error("RSS generation requires the site URL in astro.config.mjs");
  }

  const [articles, blogs] = await Promise.all([
    getCollection("article"),
    getCollection("blog"),
  ]);
  const prefix = locale === "ja" ? "" : "/en";
  const items: FeedItem[] = [
    ...articles
      .filter((post) => isListedPost(post) && isPostLocale(post, locale))
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        publishedAt: post.data.date,
        path: `${prefix}/article/${getLocalizedSlugPath(post)}/`,
      })),
    ...blogs
      .filter((post) => isListedPost(post) && isPostLocale(post, locale))
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        publishedAt: post.data.date,
        path: `${prefix}/blog/${getLocalizedSlugPath(post)}/`,
      })),
  ];

  return new Response(generateRssXml({ site, locale, items }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
