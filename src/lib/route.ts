import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useQueryParams<T extends Record<string, string>>(
  defaultValues: Partial<T> = {},
): [T, (newValues: Partial<T>) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<T>({} as T);

  // Initialize params from URL on mount
  useEffect(() => {
    const currentParams: Record<string, string> = {};

    // First set default values
    Object.entries(defaultValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        currentParams[key] = String(value);
      }
    });

    // Then override with URL params
    searchParams.forEach((value, key) => {
      currentParams[key] = value;
    });

    setQuery(currentParams as T);
  }, [searchParams, defaultValues]);

  // Update query params function
  const updateQuery = useCallback(
    (newValues: Partial<T>) => {
      const updatedSearchParams = new URLSearchParams(searchParams.toString());

      // Update or add new parameters
      Object.entries(newValues).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          updatedSearchParams.delete(key);
        } else {
          updatedSearchParams.set(key, String(value));
        }
      });

      // Create the new URL
      const newUrl = `${window.location.pathname}${
        updatedSearchParams.toString()
          ? `?${updatedSearchParams.toString()}`
          : ""
      }`;

      router.push(newUrl);
      setQuery((current) => ({ ...current, ...newValues }));
    },
    [router, searchParams],
  );

  return [query, updateQuery];
}
