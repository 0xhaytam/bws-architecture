import { tv } from "tailwind-variants";

export const expertiseBenefitItemStyles = tv({
  slots: {
    root: "grid gap-5 border-t border-grey-300 py-7 md:grid-cols-12 md:items-start md:gap-6 md:py-9",
    index: "font-mono tracking-[0.12em] text-signal md:col-span-1",
    headingGroup: "md:col-span-5",
    label: "mb-3 font-mono tracking-[0.1em] text-grey-500",
    title: "max-w-xl text-ink-950",
    description: "max-w-2xl text-grey-700 md:col-span-5 md:col-start-8 md:pt-1",
  },
});