import type { RuntimeSection } from "../types/RuntimeSection";

interface RawWordPressPage {
  id?: unknown;
  slug?: unknown;
  link?: unknown;
  title?: unknown;
  acf?: { sections?: unknown };
}

export interface RuntimePageReference {
  id: number;
  title: string;
  url: string;
}

export interface RuntimePage {
  id: number;
  slug: string;
  path: string;
  title: string;
  url: string;
  sections: RuntimeSection[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (isRecord(value) && typeof value.rendered === "string") return value.rendered;
  return "";
}

function referenceId(value: unknown): number | null {
  if (typeof value === "number") return value;
  if (!isRecord(value)) return null;
  if (typeof value.ID === "number") return value.ID;
  return typeof value.id === "number" ? value.id : null;
}

function fieldKey(object: Record<string, unknown>, name: string): string | undefined {
  return Object.keys(object).find((key) => key === name || key.endsWith(`_${name}`));
}

function resolveActionObjects(value: unknown, pages: ReadonlyMap<number, RuntimePageReference>): unknown {
  if (Array.isArray(value)) return value.map((item) => resolveActionObjects(item, pages));
  if (!isRecord(value)) return value;

  const result = Object.fromEntries(
    Object.entries(value).map(([key, child]) => [key, resolveActionObjects(child, pages)]),
  );
  const destinationTypeKey = fieldKey(result, "destinationType");
  const internalPageKey = fieldKey(result, "internalPage");
  const externalLinkKey = fieldKey(result, "externalLink");
  const internalLabelKey = fieldKey(result, "internalLabel");
  if (!destinationTypeKey && !internalPageKey && !externalLinkKey && !internalLabelKey) return result;

  const prefix = (destinationTypeKey ?? internalPageKey ?? externalLinkKey ?? internalLabelKey)!.replace(
    /(destinationType|internalPage|internalLabel|externalLink)$/,
    "",
  );
  const destinationType = destinationTypeKey ? result[destinationTypeKey] : undefined;
  const externalLink = externalLinkKey ? result[externalLinkKey] : undefined;
  const internalId = internalPageKey ? referenceId(result[internalPageKey]) : null;
  const internalLabel = internalLabelKey && typeof result[internalLabelKey] === "string"
    ? result[internalLabelKey].trim()
    : "";

  if (destinationType === "external" || (!internalId && isRecord(externalLink))) {
    if (isRecord(externalLink) && typeof externalLink.url === "string" && typeof externalLink.title === "string") {
      result[`${prefix}link`] = {
        title: externalLink.title,
        url: externalLink.url,
        target: typeof externalLink.target === "string" ? externalLink.target : "",
      };
    }
    return result;
  }

  const page = internalId ? pages.get(internalId) : undefined;
  if (page) result[`${prefix}link`] = { title: internalLabel || page.title, url: page.url, target: "" };
  return result;
}

function basicPage(value: unknown): Omit<RuntimePage, "sections"> & { rawSections: unknown } {
  if (!isRecord(value)) throw new Error("Invalid WordPress page response");
  const page = value as RawWordPressPage;
  if (typeof page.id !== "number" || typeof page.slug !== "string" || typeof page.link !== "string") {
    throw new Error("WordPress page is missing id, slug, or link");
  }
  return {
    id: page.id,
    slug: page.slug,
    path: new URL(page.link, "http://localhost").pathname.replace(/^\/+|\/+$/g, ""),
    title: textValue(page.title),
    url: page.link,
    rawSections: page.acf?.sections,
  };
}

function normalizeSections(value: unknown, slug: string, pages: ReadonlyMap<number, RuntimePageReference>): RuntimeSection[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw new Error(`Invalid ACF sections for WordPress page "${slug}"`);
  return value.map((section, index) => {
    if (!isRecord(section) || typeof section.acf_fc_layout !== "string" || !section.acf_fc_layout) {
      throw new Error(`Invalid ACF section ${index} for WordPress page "${slug}"`);
    }
    return resolveActionObjects(section, pages) as RuntimeSection;
  });
}

export function normalizeWordPressPages(values: unknown[]): RuntimePage[] {
  const basics = values.map(basicPage);
  const references = new Map<number, RuntimePageReference>(
    basics.map((page) => [page.id, { id: page.id, title: page.title, url: page.url }]),
  );
  return basics.map(({ rawSections, ...page }) => ({
    ...page,
    sections: normalizeSections(rawSections, page.slug, references),
  }));
}

export function normalizeWordPressPage(value: unknown): RuntimePage {
  return normalizeWordPressPages([value])[0];
}
