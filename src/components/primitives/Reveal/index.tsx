import type { ReactNode } from "react";
import { revealStyles } from "./base";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  repeat?: boolean;
}

export function Reveal({ children, className, delay = 0, repeat = true }: RevealProps) {
  return (
    <div
      className={revealStyles({ class: className })}
      data-reveal={repeat ? "" : undefined}
      suppressHydrationWarning
      data-reveal-delay={repeat && delay ? Math.round(delay * 1000) : undefined}
    >
      {children}
    </div>
  );
}