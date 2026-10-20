import { tv } from "tailwind-variants";

export const projectInvitationStyles = tv({
  slots: {
    root: "grid bg-paper-0 lg:grid-cols-2",
    media: "relative min-h-[38rem] overflow-hidden bg-spatial lg:min-h-[52rem]",
    image: "absolute inset-0 h-full w-full object-cover",
    mediaTint: "absolute inset-0 bg-spatial/42 mix-blend-multiply",
    caption: "absolute left-6 top-6 z-10 bg-ink-950/75 px-3 py-2 text-paper-0 backdrop-blur-sm sm:left-10 sm:top-10",
    contactCard: "absolute left-1/2 top-1/2 z-10 grid w-[calc(100%-3rem)] max-w-[36rem] -translate-x-1/2 -translate-y-1/2 bg-paper-0/94 px-6 shadow-[0_20px_60px_rgba(17,17,17,.2)] backdrop-blur-md sm:w-[min(72%,36rem)] sm:px-8",
    formPanel: "flex min-h-[48rem] items-center bg-paper-0 px-[var(--page-gutter)] py-16 lg:min-h-[52rem]",
    formInner: "mx-auto w-full max-w-2xl",
    kicker: "font-mono tracking-[0.1em] text-signal",
    headline: "mt-5 max-w-xl text-ink-950",
    description: "mt-5 max-w-xl text-grey-700",
  },
});
