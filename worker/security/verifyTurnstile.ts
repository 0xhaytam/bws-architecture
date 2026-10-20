const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileResponse {
  success: boolean;
}

export type TurnstileFetcher = (
  input: string,
  init?: RequestInit,
) => Promise<Response>;

export class TurnstileConfigurationError extends Error {
  constructor() {
    super("TURNSTILE_SECRET_KEY is not configured");
    this.name = "TurnstileConfigurationError";
  }
}

export async function verifyTurnstile(
  secret: string | undefined,
  token: string,
  remoteIp?: string,
  fetcher: TurnstileFetcher = fetch,
): Promise<boolean> {
  if (!secret?.trim()) {
    throw new TurnstileConfigurationError();
  }

  const response = await fetcher(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      response: token,
      remoteip: remoteIp,
    }),
  });
  const result = (await response.json()) as TurnstileResponse;

  return response.ok && result.success;
}
