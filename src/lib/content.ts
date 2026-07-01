export interface MarkdownHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface PostListItem {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  href: string;
}

export type PostLocale = "ja" | "en";

interface PostLike {
  id: string;
  filePath?: string;
  data: {
    title: string;
    description: string;
    date: Date;
    draft?: boolean;
    tags: string[];
  };
}

export function getVisibleHeadings(headings: MarkdownHeading[]) {
  return headings.filter((heading) => heading.depth >= 2 && heading.depth <= 4);
}

export function getSlugPath(id: string) {
  return id.replace(/\/index$/, "");
}

export function getPostLocale(post: PostLike): PostLocale {
  const directoryLocale = post.filePath?.match(/(?:^|\/)(ja|en)\//)?.[1];

  if (directoryLocale === "ja" || directoryLocale === "en") {
    return directoryLocale;
  }

  if (post.filePath?.match(/\.en\.mdx?$/)) {
    return "en";
  }

  return "ja";
}

export function getLocalizedSlugPath(post: PostLike) {
  const slug = getSlugPath(post.id);
  const directorySlug = slug.replace(/^(ja|en)\//, "");

  if (directorySlug !== slug) {
    return directorySlug;
  }

  const suffix = post.filePath?.match(/\.(ja|en)\.mdx?$/)?.[1];

  return suffix ? slug.replace(new RegExp(`${suffix}$`), "") : slug;
}

export function isPostLocale(post: PostLike, locale: PostLocale) {
  return getPostLocale(post) === locale;
}

export function hasPostTranslation(posts: PostLike[], post: PostLike) {
  const locale = getPostLocale(post);
  const slug = getLocalizedSlugPath(post);

  return posts.some(
    (candidate) =>
      getPostLocale(candidate) !== locale && getLocalizedSlugPath(candidate) === slug,
  );
}

export function isPublishedPost(post: PostLike) {
  return !post.data.draft;
}

export function sortPostsByDateDesc<T extends PostLike>(posts: T[]) {
  return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function toPostListItem(
  post: PostLike,
  basePath: "/article" | "/blog" | "/en/article" | "/en/blog",
): PostListItem {
  return {
    title: post.data.title,
    description: post.data.description,
    date: post.data.date,
    tags: post.data.tags,
    href: `${basePath}/${getLocalizedSlugPath(post)}`,
  };
}
