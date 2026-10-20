import { tv } from "tailwind-variants";

export const actionLinkStyles = tv({
  slots: {
    root: "group inline-flex min-h-11 items-center justify-between gap-5 border px-5 text-c1 font-semibold normal-case transition-[color,background-color,border-color,transform] duration-300 ease-editorial focus-visible:outline-2 focus-visible:outline-offset-4",
    label: "leading-none",
    mark: "transition-transform duration-300 ease-editorial group-hover:translate-x-1",
  },
  variants: {
    intent: {
      primary: { root: "border-signal bg-signal text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-paper-0" },
      dark: { root: "border-ink-950 bg-ink-950 text-paper-0 hover:bg-transparent hover:text-ink-950" },
      secondary: { root: "border-grey-300 bg-transparent text-ink-950 hover:border-ink-950" },
      inverse: { root: "border-paper-0/40 bg-transparent text-paper-0 hover:border-paper-0 hover:bg-paper-0 hover:text-ink-950" },
    },
    size: {
      compact: { root: "min-h-10 px-4" },
      default: { root: "min-h-11 px-5" },
      wide: { root: "min-h-12 px-5 sm:min-w-56" },
    },
  },
  defaultVariants: { intent: "secondary", size: "default" },
});
