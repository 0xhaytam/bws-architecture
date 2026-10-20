import { describe, expect, it } from "vitest";
import {
  deriveWordPressApiUrl,
  joinUrlPath,
  resolveWordPressApiUrl,
  resolveWordPressCmsUrl,
} from "./urls";

describe("WordPress URL configuration", () => {
  it("derives the REST API from the single CMS URL", () => {
    expect(deriveWordPressApiUrl("https://cms.example.com")).toBe(
      "https://cms.example.com/wp-json",
    );
  });

  it("preserves WordPress subdirectory installations", () => {
    expect(deriveWordPressApiUrl("https://example.com/wordpress/")).toBe(
      "https://example.com/wordpress/wp-json",
    );
    expect(joinUrlPath("https://example.com/wordpress", "blog/article")).toBe(
      "https://example.com/wordpress/blog/article",
    );
  });

  it("supports the legacy variables during migration", () => {
    expect(resolveWordPressCmsUrl({ WP_BASE_URL: "https://old.example.com/" })).toBe(
      "https://old.example.com",
    );
    expect(
      resolveWordPressApiUrl({ WP_API_URL: "https://old.example.com/wp-json/" }),
    ).toBe("https://old.example.com/wp-json");
  });

  it("prefers WP_CMS_URL over legacy variables", () => {
    const environment = {
      WP_CMS_URL: "https://cms.example.com",
      WP_BASE_URL: "https://old.example.com",
      WP_API_URL: "https://old.example.com/wp-json",
    };
    expect(resolveWordPressCmsUrl(environment)).toBe("https://cms.example.com");
    expect(resolveWordPressApiUrl(environment)).toBe(
      "https://cms.example.com/wp-json",
    );
  });
});
