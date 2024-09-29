import { LocalizationContext } from "@/i18n/LocalizationProvider";
import { useContext } from "react";

export const useLocale = () => {
  const context = useContext(LocalizationContext);

  if (context === undefined) {
    throw new Error("useLocale must be used within a LocalizationProvider");
  }
  return context;
};
