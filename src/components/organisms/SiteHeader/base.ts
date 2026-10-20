import { tv } from "tailwind-variants";

export const siteHeaderStyles = tv({
  slots: {
    root: "sticky top-0 z-50 border-b border-grey-300 bg-paper-50/95 backdrop-blur-md",
    inner: "relative flex min-h-[4.75rem] items-center justify-between gap-6",
    brand: "relative z-20 flex shrink-0 items-center text-ink-950",
    logo: "h-10 w-auto sm:h-11",
    nav: "ml-auto hidden lg:block",
    navList: "flex list-none items-center gap-7 p-0",
    navLink:
      "relative block py-2 text-c1 font-medium text-grey-700 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-signal after:transition-transform hover:text-ink-950 hover:after:scale-x-100 focus-visible:text-ink-950",
    dropdownItem: "group/dropdown relative",
    dropdown: "relative",
    dropdownTrigger:
      "flex cursor-pointer items-center gap-2 border-0 bg-transparent py-2 text-c1 font-medium text-grey-700 transition-colors hover:text-ink-950",
    chevron:
      "size-1.5 rotate-45 border-b border-r border-current transition-transform group-data-[open=true]/dropdown:-rotate-135",
    dropdownPanel:
      "invisible absolute left-1/2 top-full min-w-80 -translate-x-1/2 border border-grey-300 bg-paper-0 p-2 opacity-0 shadow-[0_24px_60px_rgba(17,17,17,0.12)] transition-[opacity,visibility] duration-200 group-data-[open=true]/dropdown:visible group-data-[open=true]/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-focus-within/dropdown:visible group-focus-within/dropdown:opacity-100",
    dropdownList: "list-none p-0",
    dropdownLink:
      "grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-grey-150 px-3 py-3 text-p3 text-ink-950 transition-colors last:border-b-0 hover:bg-paper-50 hover:text-signal focus-visible:bg-paper-50",
    dropdownIndex: "font-mono text-c2 text-grey-500",
    dropdownArrow: "text-base text-signal",
    actions: "hidden items-center sm:flex lg:ml-1",
    mobileMenu: "relative z-30 ml-auto lg:hidden",
    mobileToggle:
      "flex min-h-11 cursor-pointer list-none items-center gap-3 border border-grey-300 px-4 text-c1 font-medium uppercase tracking-[0.08em] marker:content-none [&::-webkit-details-marker]:hidden",
    mobileToggleLabel: "sm:hidden",
    menuIcon:
      "relative block h-3.5 w-5 border-y border-ink-950 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:-translate-y-1/2 before:bg-ink-950",
    mobilePanel:
      "absolute right-[calc(-1*var(--page-gutter))] top-[calc(100%+1rem)] w-screen border-y border-grey-300 bg-paper-50 px-[var(--page-gutter)] py-6 shadow-[0_24px_60px_rgba(17,17,17,0.14)]",
    mobileList: "m-0 list-none p-0",
    mobileLink:
      "flex min-h-14 items-center border-b border-grey-300 text-t5 font-medium text-ink-950 transition-colors hover:text-signal",
    mobileGroup: "group/mobile",
    mobileGroupTrigger:
      "flex min-h-14 cursor-pointer list-none items-center justify-between border-b border-grey-300 text-t5 font-medium text-ink-950 marker:content-none [&::-webkit-details-marker]:hidden",
    mobilePlus:
      "relative size-4 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-current after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:bg-current after:transition-transform group-open/mobile:after:rotate-90",
    mobileSubmenu: "list-none border-b border-grey-300 bg-paper-0 px-5 py-2",
    mobileSublink:
      "block border-b border-grey-150 py-3 text-p3 text-grey-700 last:border-b-0 hover:text-signal",
    mobileAction: "pt-6",
  },
});
