import { tv } from "tailwind-variants";

export const contactFormStyles = tv({
  slots: {
    root: "mt-9 grid gap-x-5 gap-y-5 sm:grid-cols-2",
    full: "grid gap-2 sm:col-span-2",
    fieldRoot: "grid gap-2",
    messageField: "sm:col-span-2",
    label: "text-c1 font-medium text-ink-800",
    required: "ml-1 text-signal",
    control: "relative",
    input: "min-h-12 w-full border border-grey-300 bg-paper-0 px-4 text-p3 text-ink-950 outline-none transition-[border-color,box-shadow] placeholder:text-grey-500 focus:border-spatial focus:shadow-[0_0_0_3px_rgba(0,119,151,.12)]",
    inputWithIcon: "pl-11",
    textarea: "min-h-36 resize-y py-3",
    adornment: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-grey-500",
    errors: "grid gap-1",
    error: "text-c2 text-signal",
    select: "min-h-12 w-full appearance-none border border-grey-300 bg-paper-0 px-4 pr-10 text-p3 text-ink-950 outline-none transition-[border-color,box-shadow] focus:border-spatial focus:shadow-[0_0_0_3px_rgba(0,119,151,.12)]",
    selectWrap: "relative",
    chevron: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-grey-500",
    security: "min-h-16 sm:col-span-2",
    missingSecurity: "border border-signal/30 bg-signal/5 p-3 text-grey-700",
    footer: "flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between",
    button: "group inline-flex min-h-12 items-center gap-5 border border-signal bg-signal px-6 text-c1 font-semibold text-ink-950 transition-colors hover:border-ink-950 hover:bg-ink-950 hover:text-paper-0 disabled:cursor-not-allowed disabled:opacity-50",
    buttonIcon: "transition-transform duration-300 group-hover:translate-x-1",
    note: "max-w-sm text-grey-500",
    status: "border-l-2 border-spatial pl-3 text-grey-700 sm:col-span-2",
  },
});
