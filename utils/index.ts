import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function clearEmpty(filters: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === "string") {
        return value.trim() !== "";
      }

      return value != null;
    }),
  );
}
