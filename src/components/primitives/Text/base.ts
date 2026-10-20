import { tv } from "tailwind-variants";

export const textBase = tv({
  base: "font-content text-pretty",
  variants: {
    level: {
      p1: "text-p1",
      p2: "text-p2",
      p3: "text-p3",
      c1: "text-c1",
      c2: "text-c2",
    },
    justify: {
      start: "text-start",
      center: "text-center",
      end: "text-end",
    },
    muted: {
      true: "text-grey-700",
    },
  },
  defaultVariants: {
    level: "p2",
    justify: "start",
  },
}, { twMerge: false });
