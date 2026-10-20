import { tv } from "tailwind-variants";

export const expertiseItemStyles = tv({
  slots: {
    root: "group relative grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)_auto] gap-x-3 gap-y-5 border-t border-grey-300 py-6 text-ink-950 transition-[border-color] duration-300 ease-editorial focus-visible:outline-none md:grid-cols-[3.5rem_minmax(0,1fr)_3rem] md:gap-x-5 md:py-7 md:pl-6",
    indicator: "absolute inset-y-0 left-0 hidden w-1 origin-center bg-signal md:block",
    index: "pt-1 font-mono tracking-[0.12em] text-grey-500 transition-colors duration-300",
    copy: "min-w-0 md:grid md:grid-cols-7 md:items-start md:gap-5",
    title: "text-ink-950 transition-[color,transform] duration-500 ease-editorial md:col-span-3",
    description: "mt-2 max-w-xl text-grey-700 transition-colors duration-300 md:col-span-4 md:mt-1",
    mark: "mt-1 text-grey-500 transition-[color,transform] duration-500 ease-editorial md:group-hover:translate-x-1 md:group-hover:-translate-y-1",
    mobileMedia: "col-span-3 aspect-[16/9] overflow-hidden bg-grey-150 md:hidden",
    image: "h-full w-full scale-[1.025] object-cover transition-transform duration-700 ease-editorial md:group-hover:scale-100",
  },
  variants: {
    active: {
      true: {
        index: "md:text-signal",
        title: "md:translate-x-1 md:text-signal",
        mark: "md:translate-x-1 md:-translate-y-1 md:text-signal",
      },
      false: {
        title: "md:group-hover:translate-x-1 md:group-hover:text-ink-800",
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
