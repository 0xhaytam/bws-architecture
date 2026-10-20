import { sanitizeWordPressData } from "./sanitize";
import { requestWordPress, type WordPressTransportResult } from "./transport";

export async function fetchWordPressData<T>(
  endpoint: string,
): Promise<WordPressTransportResult<T>> {
  const response = await requestWordPress<unknown>(endpoint);
  return {
    ...response,
    data: sanitizeWordPressData<T>(response.data),
  };
}
