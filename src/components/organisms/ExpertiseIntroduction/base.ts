import { tv } from "tailwind-variants";

export const expertiseIntroductionStyles = tv({
  slots: {
    root: "bg-paper-0 py-[var(--section-space)]",
    headingRow: "grid gap-5 border-t border-ink-950 pt-5 md:grid-cols-12 md:gap-6",
    kicker: "font-mono tracking-[0.12em] text-signal md:col-span-2",
    headline: "max-w-5xl text-ink-950 md:col-span-8",
    layout: "mt-12 grid gap-9 md:mt-16 md:grid-cols-12 md:items-start md:gap-8",
    leadColumn: "md:col-span-5 md:col-start-2 md:pt-10",
    lead: "border-l border-signal pl-5 text-ink-950",
    paragraphs: "mt-8 grid gap-5 text-grey-700",
    media: "relative md:col-span-6 md:col-start-7",
    image: "aspect-[4/3] w-full object-cover",
    imageFallback: "block aspect-[4/3] bg-grey-150 [background-image:linear-gradient(135deg,transparent_49.8%,var(--color-grey-300)_50%,transparent_50.2%)]",
    caption: "border-b border-grey-300 py-3 font-mono tracking-[0.08em] text-grey-500",
  },
});