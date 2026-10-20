import { tv } from "tailwind-variants";

export const projectSubmissionStyles = tv({
  slots: {
    root: "bg-paper-0 py-[var(--section-space)]",
    layout: "mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10",
    aside: "self-start lg:sticky lg:top-28 lg:col-span-3",
    asideIndex: "font-mono tracking-[0.1em] text-signal",
    guidance: "mt-6 max-w-sm text-grey-700",
    requiredNote: "mt-8 max-w-xs text-grey-500",
    formPanel: "bg-paper-50 p-6 sm:p-8 lg:col-span-8 lg:col-start-5 lg:p-10 xl:p-12",
  },
});
