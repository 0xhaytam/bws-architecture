import { tv } from "tailwind-variants";

export const agencyProfileStyles = tv({
  slots: {
    root: "bg-paper-0 py-[var(--section-space)]",
    copyGrid: "mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-6",
    leadWrap: "md:col-span-6 md:col-start-2",
    lead: "max-w-3xl border-l border-signal pl-6 text-[clamp(1.45rem,2.4vw,2.35rem)] leading-[1.25] tracking-[-0.025em] text-ink-950 md:pl-8",
    paragraphs: "grid gap-5 border-t border-grey-300 pt-6 text-grey-700 md:col-span-4 md:col-start-9",
    media: "relative mt-12 overflow-hidden bg-grey-150 md:mt-20 md:ml-[8.333%]",
    image: "aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:aspect-[16/7]",
    frame: "pointer-events-none absolute inset-4 border border-paper-0/55 md:inset-6",
    caption: "absolute bottom-0 left-0 max-w-lg bg-paper-0 px-4 py-3 font-mono tracking-[0.08em] text-grey-700 md:px-5",
  },
});
