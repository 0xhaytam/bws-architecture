import { tv } from "tailwind-variants";

export const siteFooterStyles = tv({
  slots: {
    root: "bg-ink-950 py-12 text-paper-0 sm:py-16",
    grid: "grid gap-12 border-t border-paper-0/20 pt-8 md:grid-cols-12",
    brand: "md:col-span-5 lg:col-span-4",
    logo: "h-18 w-auto",
    statement: "mt-8 max-w-md text-paper-0/65",
    contact: "space-y-4 md:col-span-3",
    nav: "grid gap-10 sm:grid-cols-2 md:col-span-4 lg:col-span-5",
    menuGroup: "content-start",
    menuList: "mt-4 grid list-none gap-3 p-0",
    label: "font-mono tracking-[0.1em] text-paper-0/45",
    link: "w-fit text-p3 text-paper-0 transition-colors hover:text-signal",
    address: "max-w-xs not-italic text-paper-0/70",
    legal:
      "mt-14 flex flex-wrap justify-between gap-4 border-t border-paper-0/20 pt-5 font-mono tracking-[0.08em] text-paper-0/40",
  },
});
