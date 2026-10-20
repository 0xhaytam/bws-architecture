import { tv } from "tailwind-variants";

export const contactDetailsStyles = tv({
  slots: {
    root: "bg-paper-50 py-[var(--section-space)]",
    items: "mt-12 grid gap-x-8 md:mt-16 md:grid-cols-2 lg:grid-cols-4",
  },
});
