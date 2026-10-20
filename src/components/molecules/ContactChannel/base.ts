import { tv } from "tailwind-variants";

export const contactChannelStyles = tv({
  slots: {
    root: "grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-grey-300 py-6 md:grid-cols-[3.5rem_minmax(0,1fr)] md:py-7",
    icon: "flex size-10 items-center justify-center bg-ink-950 text-paper-0",
    copy: "min-w-0",
    title: "text-ink-950",
    details: "mt-2 whitespace-pre-line text-grey-700",
    link: "block w-fit transition-colors hover:text-signal focus-visible:outline-none [&_*]:transition-colors hover:[&_*]:text-signal",
  },
});
