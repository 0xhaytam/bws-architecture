import { describe, expect, it } from "vitest";
import { publicCanonicalUrl, sanitizeWordPressHead } from "./head";

const options = {
  cmsUrl: "https://cms.example.com",
  publicSiteUrl: "https://www.example.com",
};

describe("sanitizeWordPressHead", () => {
  it("builds public canonicals without duplicating slashes", () => {
    expect(publicCanonicalUrl("https://www.example.com/", "/blog/2")).toBe(
      "https://www.example.com/blog/2",
    );
  });
  it("moves canonical and document URLs to the public site", () => {
    const head = [
      '<link rel="canonical" href="https://cms.example.com/about/">',
      '<meta property="og:url" content="https://cms.example.com/about/">',
      '<script type="application/ld+json">{"@id":"https://cms.example.com/about/#page"}</script>',
    ].join("\n");
    const result = sanitizeWordPressHead(head, options);
    expect(result).toContain('href="https://www.example.com/about/"');
    expect(result).toContain('content="https://www.example.com/about/"');
    expect(result).toContain('"@id":"https://www.example.com/about/#page"');
  });

  it("maps the WordPress home slug to the public root", () => {
    const result = sanitizeWordPressHead(
      '<link rel="canonical" href="https://cms.example.com/home/">',
      options,
    );
    expect(result).toContain('href="https://www.example.com/"');
  });

  it("keeps media and external URLs unchanged", () => {
    const head = [
      '<meta property="og:image" content="https://cms.example.com/wp-content/uploads/photo.jpg">',
      '<link rel="alternate" href="https://external.example.org/feed">',
    ].join("\n");
    expect(sanitizeWordPressHead(head, options)).toBe(head);
  });

  it("supports self-referencing paginated archive canonicals", () => {
    const result = sanitizeWordPressHead(
      '<link rel="canonical" href="https://cms.example.com/blog/">',
      { ...options, canonicalPath: "/blog/2" },
    );
    expect(result).toContain('href="https://www.example.com/blog/2"');
  });
});
