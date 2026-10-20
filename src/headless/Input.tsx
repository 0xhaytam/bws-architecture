import React, {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useFieldAccessibility } from "./Field";

export interface HeadlessFieldClassNames {
  root?: string;
  label?: string;
  required?: string;
  control?: string;
  input?: string;
  caption?: string;
  errors?: string;
  error?: string;
  startAdornment?: string;
  endAdornment?: string;
}

export interface HeadlessInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "children"> {
  label?: ReactNode;
  caption?: string;
  errors?: readonly string[];
  requiredLabel?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  classNames?: HeadlessFieldClassNames;
}

export const HeadlessInput = forwardRef<HTMLInputElement, HeadlessInputProps>(
  function HeadlessInput(
    {
      id,
      label,
      caption,
      errors = [],
      required,
      requiredLabel = "(required)",
      startAdornment,
      endAdornment,
      classNames = {},
      ...inputProps
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
        <div className={classNames.control} data-slot="field-control">
          {startAdornment && (
            <span
              className={classNames.startAdornment}
              aria-hidden="true"
              data-slot="field-start-adornment"
            >
              {startAdornment}
            </span>
          )}
          <input
            {...inputProps}
            ref={ref}
            id={field.controlId}
            required={required}
            aria-invalid={field.invalid || undefined}
            aria-describedby={field.describedBy}
            className={classNames.input}
            data-slot="input"
          />
          {endAdornment && (
            <span
              className={classNames.endAdornment}
              aria-hidden="true"
              data-slot="field-end-adornment"
            >
              {endAdornment}
            </span>
          )}
        </div>
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
  },
);
