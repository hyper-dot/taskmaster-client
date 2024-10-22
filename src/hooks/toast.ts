"use client";
import { useEffect } from "react";
import toast, { useToasterStore } from "react-hot-toast";

export function useLimitToast(limit: number) {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= limit) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts, limit]);
}
