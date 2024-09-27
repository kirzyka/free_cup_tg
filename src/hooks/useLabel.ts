import { LocalizationContext } from "@/i18n/LocalizationProvider";
import { useContext } from "react";

export const useLabel = () => {
  const context = useContext(LocalizationContext);

  if (context === undefined) {
    throw new Error("useLabel must be used within a LocalizationProvider");
  }
  return context;
};
