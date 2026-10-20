import { tv } from "tailwind-variants";

export const expertiseOverviewStyles = tv({
  slots: {
    root: "bg-paper-50 py-[var(--section-space)]",
    layout: "mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-14",
    preview: "sticky top-24 hidden min-w-0 lg:col-span-5 lg:block",
    previewMedia: "relative aspect-[4/5] overflow-hidden bg-grey-150",
    previewImage: "absolute inset-0 h-full w-full object-cover",
    previewShade: "pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/72 via-transparent to-transparent",
    previewCaption: "absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-paper-0",
    previewCount: "font-mono tracking-[0.12em] text-paper-0/65",
    previewTitle: "text-right font-medium tracking-[0.04em] text-paper-0",
    list: "border-b border-grey-300 lg:col-span-7",
  },
});
