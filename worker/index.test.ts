import { describe, expect, it, vi } from "vitest";
import worker from "./index";
import type { WorkerEnv } from "./types";

function createEnv(): WorkerEnv {
  return {
    ASSETS: {
      fetch: vi.fn(async () => new Response("static asset")),
    },
    TURNSTILE_SECRET_KEY: "test-turnstile-secret",
    FORMS_HMAC_SECRET: "test-hmac-secret",
    WP_CMS_URL: "https://wordpress.example.com",
  };
}

describe("unified site Worker", () => {
  it("passes non-API requests to the static asset binding", async () => {
    const env = createEnv();
    const request = new Request("https://example.com/about/");

    const response = await worker.fetch(request, env);

    expect(await response.text()).toBe("static asset");
    expect(env.ASSETS.fetch).toHaveBeenCalledWith(request);
  });

  it("returns 404 for unknown form API routes", async () => {
    const response = await worker.fetch(
      new Request("https://example.com/api/forms/unknown"),
      createEnv(),
    );

    expect(response.status).toBe(404);
  });

  it("rejects non-POST form submissions", async () => {
    const response = await worker.fetch(
      new Request("https://example.com/api/forms/submit"),
      createEnv(),
    );

    expect(response.status).toBe(405);
  });

  it("requires JSON form submissions", async () => {
    const response = await worker.fetch(
      new Request("https://example.com/api/forms/submit", {
        method: "POST",
        body: "not-json",
      }),
      createEnv(),
    );

    expect(response.status).toBe(415);
  });

  it("rejects unregistered form types before external requests", async () => {
    const response = await worker.fetch(
      new Request("https://example.com/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "unknown" }),
      }),
      createEnv(),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
    });
  });
});
