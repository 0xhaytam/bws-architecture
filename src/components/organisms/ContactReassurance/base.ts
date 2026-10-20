import { tv } from "tailwind-variants";

export const contactReassuranceStyles = tv({
  slots: {
    root: "bg-paper-50 py-[var(--section-space)]",
    header: "grid gap-6 md:grid-cols-12",
    kicker: "font-mono tracking-[0.12em] text-signal md:col-span-2",
    headline: "max-w-5xl text-ink-950 md:col-span-7",
    summary: "md:col-span-3",
    description: "max-w-lg text-grey-700",
    action: "mt-7",
    points: "mt-12 grid gap-x-8 md:mt-16 md:grid-cols-3",
    point: "grid content-start border-t border-grey-300 py-6",
    pointIndex: "font-mono tracking-[0.1em] text-signal",
    pointTitle: "mt-8 max-w-sm text-ink-950",
    pointDescription: "mt-4 max-w-sm text-grey-700",
  },
});
