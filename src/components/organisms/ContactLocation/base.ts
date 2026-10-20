import { tv } from "tailwind-variants";

export const contactLocationStyles = tv({
  slots: {
    root: "overflow-hidden bg-paper-0 py-[var(--section-space)]",
    layout: "mt-12 grid lg:mt-16 lg:grid-cols-12 lg:items-center",
    map: "relative min-h-[28rem] overflow-hidden bg-grey-150 lg:col-span-9 lg:col-start-1 lg:row-start-1 lg:min-h-[38rem]",
    frame: "h-full min-h-[28rem] w-full border-0 lg:min-h-[38rem]",
    panel: "relative z-20 flex min-h-[30rem] flex-col bg-ink-950 p-7 text-paper-0 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:my-8 lg:min-h-[32rem] lg:p-10 xl:p-12",
    panelLabel: "font-mono tracking-[0.1em] text-signal",
    address: "mt-7 max-w-sm whitespace-pre-line text-paper-0",
    service: "mt-9 border-t border-paper-0/20 pt-6",
    serviceLabel: "font-mono tracking-[0.08em] text-paper-0/45",
    serviceNote: "mt-4 max-w-sm text-paper-0/72",
    action: "mt-8 lg:mt-auto",
  },
});
