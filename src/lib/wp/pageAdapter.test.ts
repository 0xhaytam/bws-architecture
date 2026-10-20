import { describe, expect, it } from "vitest";
import { normalizeWordPressPage, normalizeWordPressPages } from "./pageAdapter";

describe("normalizeWordPressPage", () => {
  it("returns only the runtime page fields used by Astro", () => {
    const page = normalizeWordPressPage({ id: 42, slug: "contact", link: "/cabinet/contact/", title: { rendered: "Contact" }, acf: { sections: [{ acf_fc_layout: "contact_01", title: "Contact" }] } });
    expect(page).toEqual({ id: 42, slug: "contact", path: "cabinet/contact", title: "Contact", url: "/cabinet/contact/", sections: [{ acf_fc_layout: "contact_01", title: "Contact" }] });
  });

  it("resolves internal action IDs to the current page title and URL", () => {
    const [home] = normalizeWordPressPages([
      { id: 1, slug: "home", link: "/", title: { rendered: "Accueil" }, acf: { sections: [{ acf_fc_layout: "hero", actions: [{ action_destinationType: "internal", action_internalPage: 2 }] }] } },
      { id: 2, slug: "contact-new", link: "/contact-new/", title: { rendered: "Contactez-nous" }, acf: { sections: [] } },
    ]);
    expect((home.sections[0] as any).actions[0].action_link).toEqual({ title: "Contactez-nous", url: "/contact-new/", target: "" });
  });

  it("uses an optional internal label override without weakening the page reference", () => {
    const [home] = normalizeWordPressPages([
      { id: 1, slug: "home", link: "/", title: { rendered: "Accueil" }, acf: { sections: [{ acf_fc_layout: "hero", actions: [{ action_destinationType: "internal", action_internalPage: 2, action_internalLabel: "Nous écrire" }] }] } },
      { id: 2, slug: "contact", link: "/contact/", title: { rendered: "Contact" }, acf: { sections: [] } },
    ]);
    expect((home.sections[0] as any).actions[0].action_link).toEqual({ title: "Nous écrire", url: "/contact/", target: "" });
  });
  it("normalizes an external ACF link without a duplicate label", () => {
    const page = normalizeWordPressPage({ id: 1, slug: "home", link: "/", title: { rendered: "Accueil" }, acf: { sections: [{ acf_fc_layout: "hero", actions: [{ action_destinationType: "external", action_externalLink: { title: "Plans", url: "https://example.com", target: "_blank" } }] }] } });
    expect((page.sections[0] as any).actions[0].action_link).toEqual({ title: "Plans", url: "https://example.com", target: "_blank" });
  });

  it("leaves incomplete action rows safely unresolved", () => {
    const page = normalizeWordPressPage({ id: 1, slug: "home", link: "/", title: { rendered: "Accueil" }, acf: { sections: [{ acf_fc_layout: "hero", actions: [{ action_destinationType: "internal" }] }] } });
    expect((page.sections[0] as any).actions[0].action_link).toBeUndefined();
  });

  it("fails fast when an ACF section has no layout name", () => {
    expect(() => normalizeWordPressPage({ id: 42, slug: "contact", link: "/contact/", title: { rendered: "Contact" }, acf: { sections: [{ title: "Broken" }] } })).toThrow("Invalid ACF section 0");
  });
});
