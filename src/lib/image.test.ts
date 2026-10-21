import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cloudflareImageUrl,
  responsiveImageAttributes,
} from "./image";

describe("Cloudflare responsive images", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("generates negotiated Cloudflare variants for the configured media domain", () => {
    vi.stubEnv("WP_MEDIA_DOMAIN", "media.example.com");

    expect(
      responsiveImageAttributes("https://media.example.com/2026/10/project.jpg", {
        widths: [400, 800, 1200],
        sizes: "(max-width: 768px) 100vw, 50vw",
        originalWidth: 900,
      }),
    ).toEqual({
      src: "https://media.example.com/cdn-cgi/image/width=800,quality=85,format=auto/2026/10/project.jpg",
      srcSet:
        "https://media.example.com/cdn-cgi/image/width=400,quality=85,format=auto/2026/10/project.jpg 400w, https://media.example.com/cdn-cgi/image/width=800,quality=85,format=auto/2026/10/project.jpg 800w",
      sizes: "(max-width: 768px) 100vw, 50vw",
    });
  });

  it("leaves unrelated, SVG, and already transformed sources unchanged", () => {
    vi.stubEnv("WP_MEDIA_DOMAIN", "https://media.example.com");

    expect(cloudflareImageUrl("https://images.unsplash.com/photo.jpg", 800)).toBe(
      "https://images.unsplash.com/photo.jpg",
    );
    expect(cloudflareImageUrl("https://media.example.com/logo.svg", 800)).toBe(
      "https://media.example.com/logo.svg",
    );
    expect(
      cloudflareImageUrl(
        "https://media.example.com/cdn-cgi/image/width=800/photo.jpg",
        400,
      ),
    ).toBe("https://media.example.com/cdn-cgi/image/width=800/photo.jpg");
  });

  it("falls back to the original source when the media domain is unavailable", () => {
    vi.stubEnv("WP_MEDIA_DOMAIN", "");
    expect(responsiveImageAttributes("https://media.example.com/photo.jpg")).toEqual({
      src: "https://media.example.com/photo.jpg",
    });
  });
});
