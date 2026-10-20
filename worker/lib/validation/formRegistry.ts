import { contactSchema } from "./contactSchema";

/**
 * Form schema registry
 *
 * Maps form type names to their Zod validation schemas.
 */
export const formSchemas = {
  contact: contactSchema,
} as const;

export type FormType = keyof typeof formSchemas;

/**
 * Get the Zod schema for a given form type
 */
export function getFormSchema(formType: FormType) {
  return formSchemas[formType];
}

/**
 * Generate HMAC-SHA256 signature for a payload using Web Crypto API
 *
 * @param payload - JSON string or object to sign
 * @param secret - HMAC secret key
 * @returns Promise resolving to hex-encoded HMAC signature
 */
export async function generateHmac(
  payload: string | object,
  secret: string,
): Promise<string> {
  if (!secret) {
    throw new Error("HMAC secret is not configured");
  }

  const data = typeof payload === "string" ? payload : JSON.stringify(payload);

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(data);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, messageData);
  const array = new Uint8Array(signature);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Alias for generateHmac
 */
export async function generateHmacAsync(
  payload: string | object,
  secret: string,
): Promise<string> {
  return generateHmac(payload, secret);
}
