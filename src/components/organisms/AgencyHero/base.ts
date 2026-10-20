import { tv } from "tailwind-variants";

export const agencyHeroStyles = tv({
  slots: {
    root: "bg-paper-50 pb-10 pt-8 md:pb-14 md:pt-10",
    header: "grid gap-7 border-t border-ink-950 pt-4 md:grid-cols-12 md:gap-6",
    meta: "flex items-start justify-between md:col-span-2 md:block",
    kicker: "font-mono tracking-[0.12em] text-signal",
    location: "font-mono tracking-[0.1em] text-grey-500 md:mt-4 md:block",
    headline: "max-w-5xl text-ink-950 md:col-span-7",
    summary: "md:col-span-3 md:pt-1",
    description: "max-w-lg text-grey-700",
    actions: "mt-7 flex flex-col gap-3",
    mediaGrid: "mt-10 grid gap-5 md:mt-14 md:grid-cols-12 md:items-end md:gap-6",
    primaryMedia: "relative overflow-hidden bg-grey-150 md:col-span-9",
    primaryImage: "aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[16/8]",
    signal: "absolute left-0 top-0 h-24 w-1 bg-signal md:h-36",
    caption: "absolute bottom-0 right-0 max-w-lg bg-ink-950/84 px-4 py-3 font-mono tracking-[0.08em] text-paper-0 md:px-5",
    detailMedia: "relative hidden overflow-hidden bg-grey-150 md:col-span-3 md:block",
    detailImage: "aspect-[3/4] w-full object-cover",
    detailLabel: "absolute inset-x-0 bottom-0 bg-paper-0 px-4 py-3 font-mono tracking-[0.1em] text-grey-700",
  },
});
