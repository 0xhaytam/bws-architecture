import {
  resolveWordPressApiUrl,
  resolveWordPressCmsUrl,
  type WordPressUrlEnvironment,
} from "./urls";

export interface WordPressTransportResult<T> {
  data: T;
  totalItems: number;
  totalPages: number;
}

function environment(): WordPressUrlEnvironment {
  return {
    WP_CMS_URL: import.meta.env.WP_CMS_URL,
    WP_BASE_URL: import.meta.env.WP_BASE_URL,
    WP_API_URL: import.meta.env.WP_API_URL,
  };
}

function apiBase(): string {
  return resolveWordPressApiUrl(environment());
}

export function wordpressBaseUrl(): string {
  return resolveWordPressCmsUrl(environment());
}

export async function requestWordPress<T>(
  endpoint: string,
): Promise<WordPressTransportResult<T>> {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  const requestUrl = `${apiBase()}${normalizedEndpoint}`;

  let response: Response;
  try {
    response = await fetch(requestUrl);
  } catch (cause) {
    throw new Error(`WordPress request failed: ${requestUrl}`, { cause });
  }

  if (!response.ok) {
    throw new Error(
      `WordPress request failed (${response.status}): ${requestUrl}`,
    );
  }

  return {
    data: (await response.json()) as T,
    totalItems: Number(response.headers.get("X-WP-Total") || "0"),
    totalPages: Number(response.headers.get("X-WP-TotalPages") || "1"),
  };
}
