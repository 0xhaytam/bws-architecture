import { createElement, type ComponentType } from "react";
import { getComponent } from "./componentRegistry";

interface HydratedSectionProps {
  layout: string;
  componentProps: Record<string, unknown>;
}

export function HydratedSection({ layout, componentProps }: HydratedSectionProps) {
  const Component = getComponent(layout) as
    | ComponentType<Record<string, unknown>>
    | undefined;

  if (!Component) return null;

  return createElement(Component, componentProps);
}