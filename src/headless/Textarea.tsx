import React, {
  forwardRef,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { useFieldAccessibility } from "./Field";
import type { HeadlessFieldClassNames } from "./Input";

export interface HeadlessTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "children"> {
  label?: ReactNode;
  caption?: string;
  errors?: readonly string[];
  requiredLabel?: ReactNode;
  classNames?: HeadlessFieldClassNames;
}

export const HeadlessTextarea = forwardRef<
  HTMLTextAreaElement,
  HeadlessTextareaProps
>(function HeadlessTextarea(
  {
    id,
    label,
    caption,
    errors = [],
    required,
    requiredLabel = "(required)",
    classNames = {},
    ...textareaProps
  },
  ref,
) {
  const field = useFieldAccessibility({ id, caption, errors });
  return (
    <div
      className={classNames.root}
      data-invalid={field.invalid || undefined}
      data-slot="field-root"
    >
      {label && (
        <label
          className={classNames.label}
          htmlFor={field.controlId}
          data-slot="field-label"
        >
          {label}
          {required && (
            <span className={classNames.required} data-slot="field-required">
              {requiredLabel}
            </span>
          )}
        </label>
      )}
      <textarea
        {...textareaProps}
        ref={ref}
        id={field.controlId}
        required={required}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
        className={classNames.input}
        data-slot="textarea"
      />
      {caption && (
        <p
          id={field.captionId}
          className={classNames.caption}
          data-slot="field-caption"
        >
          {caption}
        </p>
      )}
      {errors.length > 0 && (
        <div
          id={field.errorId}
          className={classNames.errors}
          role="alert"
          data-slot="field-errors"
        >
          {errors.map((error, index) => (
            <p
              className={classNames.error}
              key={`${index}-${error}`}
              data-slot="field-error"
            >
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
});
