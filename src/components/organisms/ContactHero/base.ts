import { tv } from "tailwind-variants";

export const contactHeroStyles = tv({
  slots: {
    root: "bg-paper-50 pb-10 pt-8 md:pb-14 md:pt-10",
    header: "grid gap-7 md:grid-cols-12 md:gap-6",
    meta: "flex items-start justify-between md:col-span-2 md:block",
    kicker: "font-mono tracking-[0.12em] text-signal",
    location: "font-mono tracking-[0.08em] text-grey-500 md:mt-4 md:block",
    headline: "max-w-5xl text-ink-950 md:col-span-7",
    summary: "md:col-span-3 md:pt-1",
    description: "max-w-lg text-grey-700",
    actions: "mt-7 flex flex-col gap-3",
    media: "relative mt-10 overflow-hidden bg-grey-150 md:mt-14",
    image: "aspect-[4/3] w-full object-cover sm:aspect-[16/8] lg:aspect-[16/6]",
    signal: "absolute right-0 top-0 h-28 w-1 bg-signal md:h-40",
    caption: "absolute bottom-0 left-0 max-w-lg bg-ink-950/84 px-4 py-3 font-mono tracking-[0.08em] text-paper-0 md:px-5",
  },
});
