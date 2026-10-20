import type { ComponentProps, ElementType, ReactNode } from "react";
import { textBase } from "./base";

export type TextData = any;
export type TextProps<T extends ElementType = "p"> = Omit<ComponentProps<T>, "children"> &
  Partial<Omit<TextData, "as">> & {
    as?: T;
    children?: ReactNode;
  };

const allowedTags = /<(?!\/?(?:b|strong|u|em|br)\b)[^>]*>/gi;

function safeInlineMarkup(value: string) {
  return {
    __html: value
      .replace(allowedTags, "")
      .replace(/<(b|strong|u|em)(?:\s[^>]*)?>/gi, "<$1>")
      .replace(/<br(?:\s[^>]*)?\/?\s*>/gi, "<br>"),
  };
}

export function Text<T extends ElementType = "p">({
  as,
  level,
  justify,
  muted,
  content,
  children,
  className,
  ...props
}: TextProps<T>) {
  const Component = (as || "p") as ElementType;
  const value = content ?? children;
  if (value === undefined || value === null || value === "" ) return null;

  if (typeof value === "string" && value.includes("<")) {
    return <Component className={textBase({ level, justify, muted, class: className })} dangerouslySetInnerHTML={safeInlineMarkup(value)} {...props} />;
  }

  return <Component className={textBase({ level, justify, muted, class: className })} {...props}>{value}</Component>;
}
