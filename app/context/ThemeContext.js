"use client";
import { createContext, useContext, useState, useEffect } from "react";
import themes from "../utils/theme";
import { useSettings } from "../utils/useSetting";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("default");
  const [isMounted, setIsMounted] = useState(false);
  const { settings, loading } = useSettings();

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && themes[storedTheme]) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, isMounted]);


  const currentTheme = themes[theme] || themes["web-default"];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeData: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
