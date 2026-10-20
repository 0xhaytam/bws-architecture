import { tv } from "tailwind-variants";

export const homeHeroStyles = tv({
  slots: {
    root: "bg-paper-50",
    grid: "grid gap-8 py-8 lg:min-h-[calc(100svh-4.75rem)] lg:grid-cols-12 lg:gap-8 lg:py-10",
    content: "grid content-start lg:col-span-5 lg:grid-rows-[auto_1fr] lg:pr-8",
    topLine: "flex justify-between border-t border-ink-950 pt-3 font-mono tracking-[0.1em] text-grey-500",
    copy: "py-12 lg:self-center lg:py-8",
    kicker: "mb-5 flex items-center gap-3 font-medium text-grey-700 before:size-2 before:bg-signal",
    headline: "max-w-3xl text-ink-950",
    description: "mt-7 max-w-xl border-l border-grey-300 pl-5 text-grey-700",
    actions: "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
    mediaColumn: "relative lg:col-span-7",
    media: "relative aspect-[4/5] overflow-hidden bg-grey-150 sm:aspect-[16/10] lg:h-full lg:min-h-[40rem] lg:aspect-auto",
    image: "absolute inset-0 h-full w-full object-cover motion-safe:animate-[architectural-drift_1.2s_var(--ease-editorial)_both]",
    overlay: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/75 to-transparent p-5 pt-20 sm:p-7",
    caption: "max-w-lg text-paper-0",
    signal: "absolute -left-1 top-10 z-10 h-20 w-1 bg-signal",
  },
});
