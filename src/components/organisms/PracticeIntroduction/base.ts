import { tv } from "tailwind-variants";

export const practiceIntroductionStyles = tv({
  slots: {
    root: "bg-paper-0 py-[var(--section-space)]",
    layout: "mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-start",
    media: "relative md:col-span-7",
    image: "aspect-[4/3] w-full object-cover",
    caption: "absolute bottom-0 left-0 max-w-sm bg-ink-950/85 px-4 py-3 text-paper-0",
    content: "border-t border-grey-300 pt-6 md:col-span-4 md:col-start-9 md:mt-16",
    paragraphs: "grid gap-5 text-grey-700 [&>*:first-child]:text-ink-950",
    action: "mt-8",
  },
});
