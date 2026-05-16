import { createContext, useEffect, useState } from "react";

// 1. Keep this local (private) to avoid the Fast Refresh warning
const ThemeContext = createContext(null);

export const ThemeProvider = ({
  children,
  defaultMode = "light",
  storageKeyMode = "micromint-ui-mode",
}) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem(storageKeyMode) || defaultMode
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (mode === "system") {
      const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemMode);
    } else {
      root.classList.add(mode);
    }
    localStorage.setItem(storageKeyMode, mode);
  }, [mode, storageKeyMode]);

  const value = { mode, setMode };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 2. Export default so your hook can find it easily
export default ThemeContext;