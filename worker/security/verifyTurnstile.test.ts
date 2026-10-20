import { describe, expect, it, vi } from "vitest";
import {
  TurnstileConfigurationError,
  verifyTurnstile,
  type TurnstileFetcher,
} from "./verifyTurnstile";

describe("verifyTurnstile", () => {
  it("fails closed without a configured secret", async () => {
    const fetcher = vi.fn<TurnstileFetcher>();

    await expect(verifyTurnstile(undefined, "token", undefined, fetcher)).rejects.toBeInstanceOf(
      TurnstileConfigurationError,
    );
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("sends the Worker secret, browser token, and visitor IP to Siteverify", async () => {
    const fetcher = vi.fn<TurnstileFetcher>(async (_input, init) => {
      expect(JSON.parse(String(init?.body))).toEqual({
        secret: "worker-secret",
        response: "browser-token",
        remoteip: "203.0.113.10",
      });
      return Response.json({ success: true });
    });

    await expect(
      verifyTurnstile(
        "worker-secret",
        "browser-token",
        "203.0.113.10",
        fetcher,
      ),
    ).resolves.toBe(true);
  });

  it("rejects unsuccessful Siteverify responses", async () => {
    const fetcher = vi.fn<TurnstileFetcher>(async () =>
      Response.json({ success: false }),
    );

    await expect(
      verifyTurnstile("worker-secret", "invalid-token", undefined, fetcher),
    ).resolves.toBe(false);
  });
});
