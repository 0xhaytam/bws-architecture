export function transformAcfData(data: unknown, parentKey?: string): unknown {
  if (Array.isArray(data)) {
    return data.map((item) => transformAcfData(item, parentKey));
  }

  if (data && typeof data === "object") {
    const object = data as Record<string, unknown>;
    const keys = Object.keys(object);
    const isAtomField =
      Boolean(parentKey) && keys.some((key) => key.startsWith(`${parentKey}_`));
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(object)) {
      if (value === "") continue;
      const cleanKey =
        isAtomField && key.startsWith(`${parentKey}_`)
          ? key.replace(`${parentKey}_`, "")
          : key;
      result[cleanKey] = transformAcfData(value, cleanKey);
    }

    return result;
  }

  return data;
}

