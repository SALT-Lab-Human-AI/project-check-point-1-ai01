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
    setPreferences((prev) => ({ ...prev, ...prefs }));
    // Optionally save to localStorage for persistence
    const updated = { ...preferences, ...prefs };
    localStorage.setItem("jobPreferences", JSON.stringify(updated));
  }, [preferences]);

  const clearPreferences = () => {
    setPreferences({});
    localStorage.removeItem("jobPreferences");
  };

  // Load preferences from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("jobPreferences");
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load preferences from localStorage", e);
      }
    }
  }, []);

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

