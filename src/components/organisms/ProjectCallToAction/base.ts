import { tv } from "tailwind-variants";

export const projectCallToActionStyles = tv({
  slots: {
    root: "overflow-hidden bg-paper-0 py-[var(--section-space)]",
    header: "grid gap-5 md:grid-cols-12 md:gap-6",
    kicker: "font-mono tracking-[0.12em] text-signal md:col-span-2",
    headline: "max-w-5xl text-ink-950 md:col-span-8",
    composition: "mt-10 grid lg:mt-14 lg:grid-cols-12 lg:items-end",
    media: "relative overflow-hidden bg-grey-150 lg:col-span-9 lg:col-start-1 lg:row-start-1",
    image: "aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[16/8] lg:min-h-[34rem]",
    signal: "absolute bottom-0 left-0 h-1 w-28 bg-signal md:w-44",
    caption: "absolute bottom-0 right-0 max-w-lg bg-paper-0 px-4 py-3 font-mono tracking-[0.08em] text-grey-700 md:px-5",
    panel: "relative z-10 bg-ink-950 p-7 text-paper-0 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mb-10 lg:p-9 xl:p-11",
    description: "max-w-lg text-paper-0/72",
    actions: "mt-8 flex flex-col gap-3",
  },
});
