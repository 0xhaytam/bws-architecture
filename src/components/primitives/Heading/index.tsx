import type { ComponentProps, ElementType, ReactNode } from "react";
import { headingBase, headingHighlight } from "./base";

export type HeadingData = any;
export type HeadingProps<T extends ElementType = "h2"> = Omit<ComponentProps<T>, "children"> &
  Partial<Omit<HeadingData, "as">> & {
    as?: T;
    children?: ReactNode;
  };

function headingMarkup(value: string) {
  const escaped = value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("&lt;highlight&gt;", `<span class="${headingHighlight()}">`)
    .replaceAll("&lt;/highlight&gt;", "</span>");
  return { __html: escaped };
}

export function Heading<T extends ElementType = "h2">({
  as,
  level,
  justify,
  content,
  children,
  className,
  ...props
}: HeadingProps<T>) {
  const Component = (as || "h2") as ElementType;
  const value = content ?? children;
  if (value === undefined || value === null || value === "" ) return null;

  if (typeof value === "string" && value.includes("<highlight>")) {
    return <Component className={headingBase({ level, justify, class: className })} dangerouslySetInnerHTML={headingMarkup(value)} {...props} />;
  }

  return <Component className={headingBase({ level, justify, class: className })} {...props}>{value}</Component>;
}
