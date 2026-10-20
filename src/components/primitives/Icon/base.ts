import { tv } from "tailwind-variants";

export const iconStyles = tv({
  base: "inline-block shrink-0",
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-7",
      xl: "size-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
