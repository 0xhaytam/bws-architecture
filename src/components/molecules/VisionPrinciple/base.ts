import { tv } from "tailwind-variants";

export const visionPrincipleStyles = tv({
  slots: {
    root: "grid h-full grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-t border-grey-300 py-6 text-ink-950 md:grid-cols-[3.25rem_minmax(0,1fr)] md:gap-5 lg:min-h-[21rem] lg:grid-cols-1 lg:content-between lg:gap-8 lg:py-7",
    index: "pt-1 font-mono tracking-[0.12em] text-signal",
    copy: "min-w-0 lg:self-end",
    label: "mb-3 font-mono tracking-[0.1em] text-grey-500",
    title: "max-w-sm text-ink-950 lg:text-[clamp(1.3rem,1.65vw,1.85rem)]",
    description: "mt-4 max-w-sm text-grey-700",
  },
});
