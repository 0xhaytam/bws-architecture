import { tv } from "tailwind-variants";

export const headingBase = tv({
  base: "font-heading font-medium text-balance",
  variants: {
    level: {
      t1: "text-t1",
      t2: "text-t2",
      t3: "text-t3",
      t4: "text-t4",
      t5: "text-t5",
      t6: "text-t6",
    },
    justify: {
      start: "text-start",
      center: "text-center",
      end: "text-end",
    },
  },
  defaultVariants: {
    level: "t2",
    justify: "start",
  },
}, { twMerge: false });

export const headingHighlight = tv({
  base: "text-signal",
});
