import { tv } from "tailwind-variants";

export const projectTileStyles = tv({
  slots: {
    root: "group relative min-w-0",
    media: "relative overflow-hidden bg-grey-150",
    image: "h-[108%] w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.018]",
    imageIndex: "absolute right-0 top-0 bg-paper-0 px-3 py-2 font-mono text-c2 tracking-[0.12em] text-ink-950",
    meta: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 pt-4 md:grid-cols-12 md:gap-x-5",
    index: "font-mono tracking-[0.1em] text-signal md:col-span-1",
    identity: "md:col-span-6",
    title: "text-ink-950 transition-transform duration-500 ease-editorial group-hover:translate-x-1",
    category: "mt-1 tracking-[0.08em] text-grey-500",
    description: "col-span-2 max-w-lg text-grey-700 md:col-span-5",
    rule: "mt-5 block h-px origin-left bg-grey-300",
  },
  variants: {
    format: {
      landscape: {
        media: "aspect-[16/10]",
      },
      portrait: {
        media: "aspect-[4/5]",
      },
      square: {
        media: "aspect-square",
      },
    },
  },
  defaultVariants: {
    format: "landscape",
  },
});
