import { tv } from "tailwind-variants";

export const projectGalleryStyles = tv({
  slots: {
    root: "bg-paper-0 py-[var(--section-space)]",
    grid: "mt-12 grid md:mt-20 md:grid-cols-12 md:items-start md:gap-x-8 xl:gap-x-12 gap-y-8",
  },
});

export const projectGalleryItemStyles = tv({
  base: "min-w-0",
  variants: {
    placement: {
      lead: "md:col-span-8",
      counter: "md:col-span-4 md:pt-24 xl:pt-36",
      compact: "md:col-span-5",
      wide: "md:col-span-7 md:pt-20 xl:pt-28",
      portrait: "md:col-span-4",
      finale: "md:col-span-8 md:pt-28 xl:pt-40",
    },
  },
  defaultVariants: {
    placement: "lead",
  },
});
