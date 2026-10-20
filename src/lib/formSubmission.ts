/**
 * Form submission helper for the same-origin Cloudflare Worker route.
 */

export interface SubmitResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * The first argument remains compatible with the existing components.
 * An empty or undefined public URL falls back to the API bundled with this site.
 */
export async function submitToWorker(
  workerUrl: string | undefined,
  formType: string,
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  const endpoint = workerUrl || "/api/forms/submit";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType,
      ...payload,
    }),
  });

  const data = (await response.json()) as SubmitResult;

  if (!response.ok) {
    return {
      success: false,
      message: data.message || "Erreur lors de l'envoi.",
      errors: data.errors,
    };
  }

  return data;
}

export async function submitForm(
  formType: string,
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  return submitToWorker(undefined, formType, payload);
}
