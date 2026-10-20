import type { z } from "zod";

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> };

/**
 * Pure validation function.
 * Takes a Zod schema and raw data, returns a structured result.
 * Zero side effects — usable on frontend and worker.
 */
export function validateForm<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown,
): ValidationResult<z.infer<TSchema>> {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string[]> = {};

  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "unknown");
    if (!errors[key]) errors[key] = [];
    errors[key].push(issue.message);
  }

  return { success: false, errors };
}
