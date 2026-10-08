"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "white-blue" | "black-white" | "white-purple";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "white-blue",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("white-blue");

  useEffect(() => {
    // Read saved theme from localStorage on initial client hydration
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeMode | null;
    if (savedTheme && ["white-blue", "black-white", "white-purple"].includes(savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      if (savedTheme === "black-white") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      document.documentElement.setAttribute("data-theme", "white-blue");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    if (newTheme === "black-white") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
