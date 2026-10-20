import { tv } from "tailwind-variants";

export const blogListingStyles = tv({
  slots: {
    root: "bg-paper-50 py-[var(--section-space)]",
    headingGrid: "grid gap-8 border-t border-ink-950 pt-5 md:grid-cols-12",
    kicker: "font-mono text-c2 tracking-[0.12em] text-signal md:col-span-2",
    heading: "max-w-4xl md:col-span-7",
    introduction: "max-w-md text-grey-700 md:col-span-3 md:pt-2",
    count: "mt-10 font-mono text-c2 tracking-[0.1em] text-grey-500 md:mt-14",
    grid: "mt-6 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3",
    empty: "mt-12 border-y border-grey-300 py-12 text-grey-700",
    pagination: "mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-grey-300 pt-6",
    paginationLink: "font-mono text-c2 font-semibold tracking-[0.08em] text-ink-950 transition-colors hover:text-signal",
    paginationCurrent: "font-mono text-c2 tracking-[0.12em] text-grey-500",
  },
});
