import { fetchWordPressData } from "./data";
import { sanitizeWordPressHead } from "./head";
import { normalizeWordPressPages, type RuntimePage } from "./pageAdapter";
import { requestWordPress, wordpressBaseUrl } from "./transport";
import { joinUrlPath } from "./urls";

interface RankMathResponse { head?: string }

function pageEndpoint(page = 1): string {
  const query = new URLSearchParams({ per_page: "100", status: "publish", page: String(page) });
  return `/wp/v2/pages?${query}`;
}

async function getRawPages(): Promise<unknown[]> {
  const first = await fetchWordPressData<unknown[]>(pageEndpoint());
  if (!Array.isArray(first.data)) throw new Error("WordPress pages endpoint did not return an array");
  const rawPages = [...first.data];
  for (let page = 2; page <= first.totalPages; page += 1) {
    const next = await fetchWordPressData<unknown[]>(pageEndpoint(page));
    if (!Array.isArray(next.data)) throw new Error(`WordPress pages endpoint failed on page ${page}`);
    rawPages.push(...next.data);
  }
  return rawPages;
}

export async function getAllPages(): Promise<RuntimePage[]> {
  return normalizeWordPressPages(await getRawPages());
}

export async function getPageBySlug(slug: string): Promise<RuntimePage> {
  const page = (await getAllPages()).find((candidate) => candidate.slug === slug);
  if (!page) throw new Error(`WordPress page not found: ${slug}`);
  return page;
}

export async function getPageHead(
  slug: string,
  options: { canonicalPath?: string } = {},
): Promise<string> {
  const cmsUrl = wordpressBaseUrl();
  const publicSiteUrl = import.meta.env.PUBLIC_SITE_URL;
  if (!publicSiteUrl) throw new Error("PUBLIC_SITE_URL is not configured");
  const pageUrl = /^https?:\/\//i.test(slug) ? slug : joinUrlPath(cmsUrl, slug);
  const query = new URLSearchParams({ url: pageUrl });
  try {
    const { data } = await requestWordPress<RankMathResponse>(
      `/rankmath/v1/getHead?${query}`,
    );
    return sanitizeWordPressHead(data.head || "", {
      cmsUrl,
      publicSiteUrl,
      canonicalPath: options.canonicalPath,
    });
  } catch (error) {
    console.warn(`Unable to load Rank Math head for "${slug}"`, error);
    return "";
  }
}
