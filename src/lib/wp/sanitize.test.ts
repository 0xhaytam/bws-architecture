import { describe, expect, it } from "vitest";
import { sanitizeWordPressData, sanitizeWordPressHtml } from "./sanitize";

describe("sanitizeWordPressData", () => {
  it("keeps current WordPress upload URLs absolute", () => {
    const result = sanitizeWordPressData<{
      image: { url: string; sizes: { large: string } };
    }>(
      {
        image: {
          url: "https://wordpress.example.com/wp-content/uploads/2026/08/project.jpg",
          sizes: {
            large:
              "https://wordpress.example.com/wp-content/uploads/2026/08/project-1024x683.jpg",
          },
        },
      },
      { currentBaseUrl: "https://wordpress.example.com" },
    );

    expect(result.image.url).toBe(
      "https://wordpress.example.com/wp-content/uploads/2026/08/project.jpg",
    );
    expect(result.image.sizes.large).toBe(
      "https://wordpress.example.com/wp-content/uploads/2026/08/project-1024x683.jpg",
    );
  });

  it("normalizes entities, URLs, empty values, and numeric ACF objects", () => {
    const result = sanitizeWordPressData<{
      title: string;
      link: string;
      items: string[];
      empty?: string;
    }>(
      {
        title: "<p>Care &amp; trust</p>",
        link: "https://wordpress.example.com/contact?from=wp",
        items: { 0: "first", 1: "second" },
        empty: "",
      },
      {
        currentBaseUrl: "https://wordpress.example.com",
        legacyBaseUrls: [],
      },
    );

    expect(result).toEqual({
      title: "Care & trust",
      link: "/contact?from=wp",
      items: ["first", "second"],
    });
  });

  it("rewrites configured legacy WordPress origins", () => {
    const result = sanitizeWordPressData<string>(
      "https://legacy.example.com/treatment",
      {
        currentBaseUrl: "https://wordpress.example.com",
        legacyBaseUrls: ["https://legacy.example.com"],
      },
    );

    expect(result).toBe("/treatment");
  });
});

describe("sanitizeWordPressHtml", () => {
  it("rewrites internal anchors while preserving WordPress media sources", () => {
    const result = sanitizeWordPressHtml(
      '<p><a href="https://wordpress.example.com/contact">Contact</a><img src="https://wordpress.example.com/wp-content/uploads/photo.jpg"></p>',
      { currentBaseUrl: "https://wordpress.example.com" },
    );
    expect(result).toBe(
      '<p><a href="/contact">Contact</a><img src="https://wordpress.example.com/wp-content/uploads/photo.jpg"></p>',
    );
  });
});
