import { decodeWordPressEntities, sanitizeWordPressHtml } from "./sanitize";
import { requestWordPress } from "./transport";

export const POSTS_PER_PAGE = 9;

export interface RuntimePostImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface RuntimePost {
  id: number;
  slug: string;
  date: string;
  wordpressUrl?: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: RuntimePostImage;
}

export interface PaginatedPosts {
  posts: RuntimePost[];
  totalItems: number;
  totalPages: number;
}

interface WordPressPost {
  id: number;
  slug: string;
  date: string;
  link?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        width?: number;
        height?: number;
        sizes?: Record<
          string,
          { source_url?: string; width?: number; height?: number }
        >;
      };
    }>;
  };
}

const pageCache = new Map<string, Promise<PaginatedPosts>>();
let allPostsCache: Promise<RuntimePost[]> | undefined;

function featuredImage(post: WordPressPost): RuntimePostImage | undefined {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return undefined;
  const full = media.media_details?.sizes?.full;
  const url = full?.source_url || media.source_url;
  if (!url) return undefined;
  return {
    url,
    alt: media.alt_text || "",
    width: full?.width || media.media_details?.width,
    height: full?.height || media.media_details?.height,
  };
}

function normalizePost(post: WordPressPost): RuntimePost {
  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    wordpressUrl: post.link,
    title: decodeWordPressEntities(post.title?.rendered || ""),
    excerpt: sanitizeWordPressHtml(post.excerpt?.rendered || ""),
    content: sanitizeWordPressHtml(post.content?.rendered || ""),
    featuredImage: featuredImage(post),
  };
}

function postsEndpoint(page: number, perPage: number): string {
  const query = new URLSearchParams({
    _embed: "wp:featuredmedia",
    page: String(page),
    per_page: String(perPage),
    status: "publish",
  });
  return `/wp/v2/posts?${query}`;
}

export function getPostsPage(
  page = 1,
  perPage = POSTS_PER_PAGE,
): Promise<PaginatedPosts> {
  const key = `${perPage}:${page}`;
  const cached = pageCache.get(key);
  if (cached) return cached;

  const pending = requestWordPress<WordPressPost[]>(
    postsEndpoint(page, perPage),
  ).then(({ data, totalItems, totalPages }) => ({
    posts: data.map(normalizePost),
    totalItems,
    totalPages,
  }));
  pageCache.set(key, pending);
  return pending;
}

export function getAllPosts(): Promise<RuntimePost[]> {
  if (allPostsCache) return allPostsCache;
  allPostsCache = (async () => {
    const first = await getPostsPage(1, 100);
    if (first.totalPages <= 1) return first.posts;
    const remaining = await Promise.all(
      Array.from({ length: first.totalPages - 1 }, (_, index) =>
        getPostsPage(index + 2, 100),
      ),
    );
    return [...first.posts, ...remaining.flatMap(({ posts }) => posts)];
  })();
  return allPostsCache;
}
