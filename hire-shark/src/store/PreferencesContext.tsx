import React, { createContext, useState, useContext, ReactNode, useCallback } from "react";
import { JobPreferences } from "../types";

type PreferencesContextType = {
  preferences: JobPreferences;
  updatePreferences: (prefs: Partial<JobPreferences>) => void;
  clearPreferences: () => void;
};

export const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<JobPreferences>({});

  const updatePreferences = useCallback((prefs: Partial<JobPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...prefs };
      return updated;
    });
  }, [preferences]);

  const clearPreferences = () => {
    setPreferences({});
  };



  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences, clearPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
  return ctx;
};

