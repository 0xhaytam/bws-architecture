import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { iconRegistry, type ClientIconToken } from "@/src/lib/iconRegistry";
import { iconStyles } from "./base";

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: ClientIconToken;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Icon({ name, size = "md", className, ...props }: IconProps) {
  const Component = iconRegistry.lucide[name] as ComponentType<LucideProps> | undefined;
  if (!Component) return null;
  return <Component aria-hidden="true" className={iconStyles({ size, class: className })} {...props} />;
}
