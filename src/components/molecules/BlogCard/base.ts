import { tv } from "tailwind-variants";

export const blogCardStyles = tv({
  slots: {
    root: "group grid h-full border-t border-grey-300 pt-4 transition-colors duration-300 hover:border-ink-950",
    media: "relative aspect-[4/3] overflow-hidden bg-grey-150",
    image: "h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.025]",
    placeholder: "absolute inset-0 bg-[linear-gradient(135deg,var(--color-grey-150),var(--color-paper-50))]",
    body: "grid content-start gap-4 pt-5",
    meta: "flex items-center justify-between gap-4 font-mono text-c2 tracking-[0.08em] text-grey-500",
    title: "transition-colors duration-300 group-hover:text-signal",
    excerpt: "line-clamp-3 text-grey-700",
    action: "mt-2 inline-flex items-center gap-3 font-mono text-c2 font-semibold tracking-[0.08em] text-ink-950",
    mark: "text-signal transition-transform duration-300 group-hover:translate-x-1",
  },
});
