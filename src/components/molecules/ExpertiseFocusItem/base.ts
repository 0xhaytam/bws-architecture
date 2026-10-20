import { tv } from "tailwind-variants";

export const expertiseFocusItemStyles = tv({
  slots: {
    root: "grid border-t border-grey-300 md:grid-cols-12 md:gap-8",
    media: "relative overflow-hidden bg-grey-150 md:col-span-7",
    image: "aspect-[16/10] h-full w-full object-cover transition-transform duration-700 ease-editorial hover:scale-[1.018]",
    imageFallback: "block aspect-[16/10] bg-grey-150 [background-image:linear-gradient(135deg,transparent_49.8%,var(--color-grey-300)_50%,transparent_50.2%)]",
    imageIndex: "absolute right-0 top-0 bg-paper-50 px-3 py-2 font-mono tracking-[0.12em] text-signal",
    content: "flex flex-col justify-center px-0 py-8 md:col-span-5 md:min-h-[26rem] md:px-7 md:py-10 lg:px-12",
    meta: "flex items-center gap-4 font-mono",
    index: "tracking-[0.12em] text-signal",
    label: "border-l border-grey-300 pl-4 tracking-[0.1em] text-grey-500",
    title: "mt-7 max-w-xl text-ink-950",
    description: "mt-5 max-w-lg text-grey-700",
  },
  variants: {
    reverse: {
      true: {
        media: "md:order-2 md:col-start-6",
        content: "md:order-1 md:col-start-1",
      },
      false: {
        media: "md:col-start-1",
        content: "md:col-start-8",
      },
    },
  },
  defaultVariants: {
    reverse: false,
  },
});