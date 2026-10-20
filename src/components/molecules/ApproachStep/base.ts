import { tv } from "tailwind-variants";

export const approachStepStyles = tv({
  slots: {
    root: "w-[84vw] flex-none snap-start bg-transparent will-change-[opacity] sm:w-[68vw] lg:w-[38vw] lg:max-w-[36rem]",
    media: "relative aspect-[16/10] overflow-hidden bg-grey-150",
    image: "absolute inset-0 h-full w-full object-cover",
    imageFallback: "absolute inset-0 [background-image:linear-gradient(135deg,transparent_49.8%,var(--color-grey-300)_50%,transparent_50.2%)]",
    imageShade: "pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/25 via-transparent to-transparent",
    icon: "absolute bottom-0 left-0 flex size-14 items-center justify-center bg-paper-50 text-signal md:size-16",
    content: "grid gap-4 border-b border-grey-300 py-6 lg:grid-cols-12 lg:gap-5 lg:py-7",
    index: "font-mono tracking-[0.1em] text-signal lg:col-span-3",
    title: "max-w-md text-ink-950 lg:col-span-9",
    description: "max-w-xl text-grey-700 lg:col-span-9 lg:col-start-4",
  },
});