export interface WordPressUrlEnvironment {
  WP_CMS_URL?: string;
  /** @deprecated Use WP_CMS_URL. */
  WP_BASE_URL?: string;
  /** @deprecated Use WP_CMS_URL and let the runtime derive /wp-json. */
  WP_API_URL?: string;
}

function withoutTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function cmsUrlFromLegacyApi(apiUrl?: string): string | undefined {
  if (!apiUrl) return undefined;
  const normalized = withoutTrailingSlash(apiUrl);
  return normalized.endsWith("/wp-json")
    ? normalized.slice(0, -"/wp-json".length)
    : undefined;
}

export function resolveWordPressCmsUrl(
  environment: WordPressUrlEnvironment,
): string {
  const configured =
    environment.WP_CMS_URL ||
    environment.WP_BASE_URL ||
    cmsUrlFromLegacyApi(environment.WP_API_URL);

  if (!configured) throw new Error("WP_CMS_URL is not configured");

  const normalized = withoutTrailingSlash(configured);
  const url = new URL(normalized);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("WP_CMS_URL must use http or https");
  }
  return url.toString().replace(/\/$/, "");
}

export function deriveWordPressApiUrl(cmsUrl: string): string {
  return new URL("wp-json", `${withoutTrailingSlash(cmsUrl)}/`)
    .toString()
    .replace(/\/$/, "");
}

export function resolveWordPressApiUrl(
  environment: WordPressUrlEnvironment,
): string {
  if (!environment.WP_CMS_URL && environment.WP_API_URL) {
    return withoutTrailingSlash(environment.WP_API_URL);
  }
  return deriveWordPressApiUrl(resolveWordPressCmsUrl(environment));
}

export function joinUrlPath(baseUrl: string, path = ""): string {
  const normalizedPath = path.replace(/^\/+/, "");
  return new URL(normalizedPath, `${withoutTrailingSlash(baseUrl)}/`).toString();
}
