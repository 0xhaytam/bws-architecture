import { tv } from "tailwind-variants";

export const expertiseFocusStyles = tv({
  slots: {
    root: "bg-paper-50 py-[var(--section-space)]",
    items: "mt-12 grid gap-12 md:mt-16 md:gap-20",
  },
});