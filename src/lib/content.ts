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

interface PostLike {
  id: string;
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

export function isPublishedPost(post: PostLike) {
  return !post.data.draft;
}

export function sortPostsByDateDesc<T extends PostLike>(posts: T[]) {
  return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function toPostListItem(post: PostLike, basePath: "/article" | "/blog"): PostListItem {
  return {
    title: post.data.title,
    description: post.data.description,
    date: post.data.date,
    tags: post.data.tags,
    href: `${basePath}/${getSlugPath(post.id)}`,
  };
}
