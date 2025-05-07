import type { ToastOptions } from "~/types";

export function useCustomToast() {
  const uiToast = useToast();

  const toast = ({ title, description, icon }: ToastOptions) => {
    uiToast.add({ title, description, icon });
  };
  return { toast };
}
