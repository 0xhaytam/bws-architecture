import { tv } from "tailwind-variants";

export const architecturalApproachStyles = tv({
  slots: {
    root: "relative bg-paper-50 text-ink-950",
    linework: "pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(17,17,17,.55)_1px,transparent_1px)] [background-size:calc((100vw-var(--page-gutter)*2)/12)_100%]",
    stage: "relative",
    sticky: "relative py-[var(--section-space)]",
    stageInner: "min-w-0",
    header: "mb-10 md:mb-12",
    viewport: "-mx-[var(--page-gutter)] overflow-x-auto px-[var(--page-gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    track: "flex w-max snap-x snap-mandatory gap-5 pr-[var(--page-gutter)] md:gap-8",
  },
  variants: {
    interactive: {
      true: {
        sticky: "lg:sticky lg:top-[4.75rem] lg:h-[calc(100svh-4.75rem)] lg:py-5",
        stageInner: "lg:flex lg:h-full lg:flex-col lg:justify-center",
        header: "lg:mb-20 lg:flex-none",
        viewport: "lg:mx-[calc(50%-50vw)] lg:w-auto lg:flex-none lg:overflow-hidden lg:px-0 lg:[--approach-edge:max(var(--page-gutter),calc((100vw-1600px)/2+var(--page-gutter)))]",
        track: "lg:snap-none lg:px-[var(--approach-edge)]",
      },
      false: {
        stage: "h-auto",
      },
    },
  },
  defaultVariants: {
    interactive: false,
  },
});
