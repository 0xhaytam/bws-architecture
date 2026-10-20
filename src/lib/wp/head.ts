import { joinUrlPath } from "./urls";

export interface WordPressHeadOptions {
  cmsUrl: string;
  publicSiteUrl: string;
  canonicalPath?: string;
}

function isMediaPath(pathname: string): boolean {
  return pathname.includes("/wp-content/uploads/");
}

function homepagePath(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return normalized === "/home" ? "/" : pathname;
}

function publicUrlForCmsUrl(
  value: string,
  cmsUrl: URL,
  publicSiteUrl: string,
): string {
  try {
    const candidate = new URL(value, cmsUrl);
    if (candidate.origin !== cmsUrl.origin || isMediaPath(candidate.pathname)) {
      return value;
    }
    const path = homepagePath(candidate.pathname);
    const target = new URL(path, `${publicSiteUrl.replace(/\/+$/, "")}/`);
    target.search = candidate.search;
    target.hash = candidate.hash;
    return target.toString();
  } catch {
    return value;
  }
}

export function publicCanonicalUrl(
  publicSiteUrl: string | undefined,
  canonicalPath: string,
): string {
  if (!publicSiteUrl) throw new Error("PUBLIC_SITE_URL is not configured");
  const normalized = canonicalPath === "" ? "/" : canonicalPath;
  return joinUrlPath(publicSiteUrl, normalized);
}

/**
 * Rewrites headless WordPress document URLs to the public Astro origin while
 * preserving media URLs and unrelated external URLs. A canonical override is
 * used for routes that do not have a one-to-one WordPress URL, such as page 2
 * of a statically generated blog archive.
 */
export function sanitizeWordPressHead(
  head: string,
  options: WordPressHeadOptions,
): string {
  if (!head) return "";
  const cmsUrl = new URL(options.cmsUrl);

  let sanitized = head.replace(
    /https?:\/\/[^\s"'<>\\]+/gi,
    (url) => publicUrlForCmsUrl(url, cmsUrl, options.publicSiteUrl),
  );

  if (options.canonicalPath !== undefined) {
    const canonical = publicCanonicalUrl(
      options.publicSiteUrl,
      options.canonicalPath,
    );
    sanitized = sanitized.replace(
      /(<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["'])([^"']*)(["'][^>]*>)/i,
      `$1${canonical}$3`,
    );
  }

  return sanitized;
}
