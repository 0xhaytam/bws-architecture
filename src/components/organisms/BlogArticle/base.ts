import { tv } from "tailwind-variants";

export const blogArticleStyles = tv({
  slots: {
    root: "bg-paper-50 py-[var(--section-space)]",
    header: "grid gap-8 border-t border-ink-950 pt-5 md:grid-cols-12",
    back: "font-mono text-c2 font-semibold tracking-[0.08em] text-signal transition-colors hover:text-ink-950 md:col-span-2",
    titleWrap: "md:col-span-8",
    title: "max-w-5xl",
    date: "mt-6 block font-mono text-c2 tracking-[0.1em] text-grey-500",
    media: "mt-12 overflow-hidden bg-grey-150 md:mt-16",
    image: "aspect-[16/8] w-full object-cover",
    content: "mx-auto mt-12 max-w-3xl text-p2 leading-relaxed text-grey-700 md:mt-16 [&_a]:text-signal [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-signal [&_blockquote]:pl-6 [&_h2]:mt-12 [&_h2]:font-heading [&_h2]:text-t3 [&_h2]:font-medium [&_h2]:text-ink-950 [&_h3]:mt-9 [&_h3]:font-heading [&_h3]:text-t4 [&_h3]:font-medium [&_h3]:text-ink-950 [&_img]:my-10 [&_img]:h-auto [&_img]:w-full [&_li]:mb-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_strong]:text-ink-950 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6",
  },
});
