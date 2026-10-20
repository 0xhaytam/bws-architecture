import { tv } from "tailwind-variants";

export const sectionHeaderStyles = tv({
  slots: {
    root: "grid gap-5 border-t pt-5 md:grid-cols-12 md:gap-6",
    label: "font-mono tracking-[0.12em] md:col-span-2",
    heading: "max-w-4xl md:col-span-7",
    introduction: "max-w-lg md:col-span-3 md:pt-1",
  },
  variants: {
    tone: {
      light: {
        root: "border-ink-950",
        label: "text-signal",
        heading: "text-ink-950",
        introduction: "text-grey-700",
      },
      dark: {
        root: "border-paper-0/35",
        label: "text-signal",
        heading: "text-paper-0",
        introduction: "text-paper-0/65",
      },
    },
  },
  defaultVariants: {
    tone: "light",
  },
});