import type { HTMLAttributes } from "react";
import { containerStyles } from "./base";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={containerStyles({ class: className })} {...props} />;
}
