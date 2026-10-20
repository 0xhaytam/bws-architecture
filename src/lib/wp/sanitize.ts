import { legacyWordPressUrls } from "../../config/wordpress";
import { wordpressBaseUrl } from "./transport";

export interface WordPressSanitizeOptions {
  currentBaseUrl?: string;
  legacyBaseUrls?: readonly string[];
}

function baseVariants(url: string): [string, string] {
  const withoutSlash = url.replace(/\/+$/, "");
  return [`${withoutSlash}/`, withoutSlash];
}

function isCurrentWordPressMediaUrl(value: string, currentBaseUrl?: string): boolean {
  if (!currentBaseUrl) return false;

  try {
    const candidate = new URL(value);
    const wordpress = new URL(currentBaseUrl);
    return (
      candidate.origin === wordpress.origin &&
      candidate.pathname.includes("/wp-content/uploads/")
    );
  } catch {
    return false;
  }
}

export function sanitizeWordPressUrl(
  value: string,
  options: WordPressSanitizeOptions = {},
): string {
  const currentBaseUrl = options.currentBaseUrl ?? wordpressBaseUrl();

  // Media must keep an absolute WordPress URL so the client site does not try
  // to serve `/wp-content/uploads/*` from its own static origin.
  if (isCurrentWordPressMediaUrl(value, currentBaseUrl)) return value;

  const bases = [
    currentBaseUrl,
    ...(options.legacyBaseUrls ?? legacyWordPressUrls),
  ].filter((url): url is string => Boolean(url));

  return bases.reduce((clean, base) => {
    const [withSlash, withoutSlash] = baseVariants(base);
    return clean.replaceAll(withSlash, "/").replaceAll(withoutSlash, "/");
  }, value);
}

/** Rewrites internal anchors in trusted WordPress HTML without touching media. */
export function sanitizeWordPressHtml(
  value: string,
  options: WordPressSanitizeOptions = {},
): string {
  const currentBaseUrl = options.currentBaseUrl ?? wordpressBaseUrl();
  const bases = [
    currentBaseUrl,
    ...(options.legacyBaseUrls ?? legacyWordPressUrls),
  ].filter((url): url is string => Boolean(url));

  return bases.reduce((clean, base) => {
    const escaped = base
      .replace(/\/+$/, "")
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return clean.replace(
      new RegExp(`(href=["'])${escaped}(?=\\/|["'])`, "gi"),
      "$1",
    );
  }, value);
}

export function decodeWordPressEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace("<div>", "")
    .replace("</div>", "")
    .replace("<p>", "")
    .replace("</p>", "");
}

/**
 * Normalizes WordPress serialization quirks. This does not make arbitrary HTML
 * safe; HTML rendered into the page must still pass through the HTML sanitizer.
 */
export function sanitizeWordPressData<T>(
  value: unknown,
  options: WordPressSanitizeOptions = {},
): T {
  if (typeof value === "string") {
    const clean = sanitizeWordPressUrl(decodeWordPressEntities(value), options);
    return (clean === "" ? undefined : clean) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeWordPressData(item, options)) as T;
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value);
    const isNumericObject =
      entries.length > 0 && entries.every(([key]) => /^\d+$/.test(key));

    if (isNumericObject) {
      return entries
        .map(([, item]) => sanitizeWordPressData(item, options))
        .filter(
          (item) => item !== null && item !== undefined && item !== "",
        ) as T;
    }

    return Object.fromEntries(
      entries
        .map(([key, item]) => [key, sanitizeWordPressData(item, options)])
        .filter(
          ([, item]) => item !== null && item !== undefined && item !== "",
        ),
    ) as T;
  }

  return value as T;
}
