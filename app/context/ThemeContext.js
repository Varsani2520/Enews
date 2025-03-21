"use client";
import { createContext, useContext, useState, useEffect } from "react";
import themes from "../utils/theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("default"); // Set a default theme
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, isMounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeData: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
