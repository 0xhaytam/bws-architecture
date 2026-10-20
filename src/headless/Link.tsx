import React, {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
} from "react";

export interface HeadlessLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  prefetch?: boolean;
}

function externalHref(href: string | undefined): boolean {
  return Boolean(href && /^(?:https?:)?\/\//i.test(href));
}

const Root = forwardRef<HTMLAnchorElement, HeadlessLinkProps>(
  function HeadlessLink(
    { href, target, rel, prefetch, children, ...props },
    ref,
  ) {
    const external = externalHref(href);
    const resolvedTarget = target ?? (external ? "_blank" : undefined);
    const resolvedRel =
      resolvedTarget === "_blank"
        ? [...new Set(`${rel ?? ""} noopener noreferrer`.trim().split(/\s+/))].join(
            " ",
          )
        : rel;

    return (
      <a
        {...props}
        ref={ref}
        href={href}
        target={resolvedTarget}
        rel={resolvedRel}
        data-astro-prefetch={prefetch || undefined}
        data-external={external || undefined}
        data-slot="link-root"
      >
        {children}
      </a>
    );
  },
);

function StartIcon(props: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} aria-hidden="true" data-slot="link-start-icon" />;
}

function Label(props: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} data-slot="link-label" />;
}

function EndIcon(props: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} aria-hidden="true" data-slot="link-end-icon" />;
}

export const HeadlessLink = { Root, StartIcon, Label, EndIcon };
