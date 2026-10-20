import { tv } from "tailwind-variants";

export const expertiseHeroStyles = tv({
  slots: {
    root: "bg-paper-50 pb-0 pt-8 md:pt-10",
    header: "grid gap-7 border-t border-ink-950 pt-4 md:grid-cols-12 md:gap-6",
    meta: "flex items-start justify-between font-mono md:col-span-2 md:block",
    kicker: "tracking-[0.12em] text-signal",
    coordinate: "tracking-[0.1em] text-grey-500 md:mt-4 md:block",
    headline: "max-w-5xl text-ink-950 md:col-span-7",
    summary: "md:col-span-3 md:pt-1",
    description: "max-w-lg text-grey-700",
    actions: "mt-7 flex flex-col gap-3",
    media: "relative mt-10 overflow-hidden bg-grey-150 md:mt-14",
    image: "aspect-[16/9] w-full object-cover sm:aspect-[16/8] lg:aspect-[16/7]",
    signal: "absolute bottom-0 left-0 h-1 w-24 bg-signal md:w-40",
    caption: "absolute bottom-0 right-0 max-w-lg bg-ink-950/82 px-4 py-3 text-paper-0 backdrop-blur-sm md:px-5",
  },
});