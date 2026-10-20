import { useId } from "react";

export interface FieldAccessibilityOptions {
  id?: string;
  caption?: string;
  errors?: readonly string[];
}

export function useFieldAccessibility({
  id,
  caption,
  errors = [],
}: FieldAccessibilityOptions) {
  const generatedId = useId();
  const controlId = id || `field-${generatedId.replaceAll(":", "")}`;
  const captionId = caption ? `${controlId}-caption` : undefined;
  const errorId = errors.length ? `${controlId}-errors` : undefined;
  const describedBy = [captionId, errorId].filter(Boolean).join(" ") || undefined;

  return {
    controlId,
    captionId,
    errorId,
    describedBy,
    invalid: errors.length > 0,
  };
}
