import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";

export interface HeadlessButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Root = forwardRef<HTMLButtonElement, HeadlessButtonProps>(
  function HeadlessButton(
    { children, disabled, loading = false, type = "button", ...props },
    ref,
  ) {
    const unavailable = disabled || loading;
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        disabled={unavailable}
        aria-busy={loading || undefined}
        data-disabled={unavailable || undefined}
        data-loading={loading || undefined}
        data-slot="button-root"
      >
        {children}
      </button>
    );
  },
);

function StartIcon(props: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} aria-hidden="true" data-slot="button-start-icon" />;
}

function Label(props: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} data-slot="button-label" />;
}

function EndIcon(props: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} aria-hidden="true" data-slot="button-end-icon" />;
}

export const HeadlessButton = { Root, StartIcon, Label, EndIcon };
