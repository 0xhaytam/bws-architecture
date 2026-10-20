import { tv } from "tailwind-variants";

export const architecturalVisionStyles = tv({
  slots: {
    root: "relative overflow-hidden bg-paper-0 py-[var(--section-space)] text-ink-950",
    linework: "pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(17,17,17,.55)_1px,transparent_1px)] [background-size:calc((100vw-var(--page-gutter)*2)/12)_100%]",
    inner: "relative",
    layout: "mt-12 grid gap-8 md:mt-16 md:gap-10 lg:grid-cols-12 lg:grid-rows-2 lg:gap-x-8 lg:gap-y-0",
    media: "relative overflow-hidden bg-grey-150 lg:col-span-6 lg:col-start-4 lg:row-span-2 lg:row-start-1 lg:h-full",
    image: "aspect-[4/3] h-full min-h-[24rem] w-full object-cover sm:aspect-[16/11] lg:min-h-[42rem] lg:aspect-auto",
    imageRule: "pointer-events-none absolute inset-5 border border-paper-0/65 md:inset-7",
    caption: "absolute bottom-0 left-0 max-w-lg bg-ink-950 px-4 py-3 font-mono tracking-[0.08em] text-paper-0 md:px-5",
    list: "grid gap-0 md:grid-cols-2 lg:contents lg:[&>*:nth-child(1)]:col-span-3 lg:[&>*:nth-child(1)]:col-start-1 lg:[&>*:nth-child(1)]:row-start-1 lg:[&>*:nth-child(2)]:col-span-3 lg:[&>*:nth-child(2)]:col-start-10 lg:[&>*:nth-child(2)]:row-start-1 lg:[&>*:nth-child(3)]:col-span-3 lg:[&>*:nth-child(3)]:col-start-1 lg:[&>*:nth-child(3)]:row-start-2 lg:[&>*:nth-child(4)]:col-span-3 lg:[&>*:nth-child(4)]:col-start-10 lg:[&>*:nth-child(4)]:row-start-2",
    item: "h-full md:odd:pr-5 md:even:pl-5 lg:px-0 lg:[&:nth-child(odd)]:pr-2 lg:[&:nth-child(even)]:pl-2",
  },
});
