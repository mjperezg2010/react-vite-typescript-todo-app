import { useCallback } from "react";
import type { ToastPosition, ToastType } from "types";

export function useToast() {
  const TYPE_CLASS: Record<ToastType, string> = {
    success: "alert-success",
    error: "alert-error",
    info: "alert-info",
    warning: "alert-warning",
  };

  const showToast = useCallback(
    (message: string, type: ToastType = "info", time = 3000, position: ToastPosition = "top-right") => {
      const containerId = `toast-root-${position}`;
      const container = document.getElementById(containerId);
      if (!container) return;

      const toast = document.createElement("div");
      const variant = TYPE_CLASS[type] ?? TYPE_CLASS.info;
      toast.className = `alert ${variant} shadow-lg`;
      toast.innerHTML = `<span>${message}</span>`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, time);
    },
    []
  );

  return { showToast };
}