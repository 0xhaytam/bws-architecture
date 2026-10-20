import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HeadlessButton, HeadlessInput, HeadlessLink } from ".";

describe("headless primitives", () => {
  it("applies native loading semantics without presentation", () => {
    const html = renderToStaticMarkup(
      <HeadlessButton.Root loading>Save</HeadlessButton.Root>,
    );
    expect(html).toContain('type="button"');
    expect(html).toContain("disabled");
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('data-loading="true"');
    expect(html).not.toContain("class=");
  });

  it("secures external links opened in a new tab", () => {
    const html = renderToStaticMarkup(
      <HeadlessLink.Root href="https://example.com">Visit</HeadlessLink.Root>,
    );
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('data-external="true"');
  });

  it("associates labels, descriptions, and errors with the input", () => {
    const html = renderToStaticMarkup(
      <HeadlessInput
        id="contact-email"
        label="Email"
        caption="We will reply here."
        errors={["Invalid email"]}
        required
      />,
    );
    expect(html).toContain('for="contact-email"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain(
      'aria-describedby="contact-email-caption contact-email-errors"',
    );
    expect(html).toContain('role="alert"');
  });
});
