const DEFAULT_WIDTHS = [320, 480, 640, 800, 1200, 1600, 2000] as const;
const DEFAULT_QUALITY = 85;

export interface ResponsiveImageOptions {
  widths?: readonly number[];
  sizes?: string;
  originalWidth?: number;
  defaultWidth?: number;
  quality?: number;
}

export interface ResponsiveImageAttributes {
  src: string;
  srcSet?: string;
  sizes?: string;
}

function configuredMediaOrigin(): string | undefined {
  const configured = import.meta.env.WP_MEDIA_DOMAIN?.trim();
  if (!configured) return undefined;

  try {
    return new URL(
      /^https?:\/\//i.test(configured) ? configured : `https://${configured}`,
    ).origin;
  } catch {
    return undefined;
  }
}

function transformableSource(source: string): URL | undefined {
  const mediaOrigin = configuredMediaOrigin();
  if (!mediaOrigin || source.startsWith("data:") || source.startsWith("blob:")) {
    return undefined;
  }

  try {
    const url = new URL(source);
    if (url.origin !== mediaOrigin || url.pathname.includes("/cdn-cgi/image/")) {
      return undefined;
    }
    if (/\.(?:avif|svg)$/i.test(url.pathname)) return undefined;
    return url;
  } catch {
    return undefined;
  }
}

export function cloudflareImageUrl(
  source: string,
  width: number,
  quality = DEFAULT_QUALITY,
): string {
  const url = transformableSource(source);
  if (!url) return source;

  return `${url.origin}/cdn-cgi/image/width=${Math.round(width)},quality=${quality},format=auto${url.pathname}${url.search}`;
}

export function responsiveImageAttributes(
  source: string,
  options: ResponsiveImageOptions = {},
): ResponsiveImageAttributes {
  const url = transformableSource(source);
  if (!url) return { src: source };

  const requestedWidths = options.widths ?? DEFAULT_WIDTHS;
  const maximumWidth = options.originalWidth
    ? Math.max(1, Math.round(options.originalWidth))
    : Number.POSITIVE_INFINITY;
  const widths = [...new Set(requestedWidths)]
    .filter((width) => width > 0 && width <= maximumWidth)
    .sort((left, right) => left - right);
  const effectiveWidths = widths.length
    ? widths
    : [Math.min(requestedWidths[0] ?? 320, maximumWidth)];
  const preferredWidth = options.defaultWidth ?? 1200;
  const defaultWidth = effectiveWidths.reduce((closest, width) =>
    Math.abs(width - preferredWidth) < Math.abs(closest - preferredWidth)
      ? width
      : closest,
  );
  const quality = options.quality ?? DEFAULT_QUALITY;

  return {
    src: cloudflareImageUrl(source, defaultWidth, quality),
    srcSet: effectiveWidths
      .map((width) => `${cloudflareImageUrl(source, width, quality)} ${width}w`)
      .join(", "),
    sizes: options.sizes ?? "100vw",
  };
}
