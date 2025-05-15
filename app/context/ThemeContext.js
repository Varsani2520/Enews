"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "../service/settings";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [themes, setThemes] = useState([]);
  const [config, setConfig] = useState(null);
  const [currentThemeName, setCurrentThemeName] = useState("web-default");
  const [themeData, setThemeData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await getSettings();
        const allThemes = response.data.webSettings.config.themes;
        const configData = response.data.webSettings.config;
        setSettings(response.data.webSettings);

        // 1. Check for saved theme in localStorage
        const savedTheme = localStorage.getItem("selectedTheme");
        const activeThemeName =
          savedTheme || response.data.webSettings.themeName || "web-default";

        setThemes(allThemes);
        setConfig(configData);
        setCurrentThemeName(activeThemeName);

        // 2. Set the theme data
        const activeTheme = allThemes.find((t) => t.name === activeThemeName);
        if (activeTheme) setThemeData(activeTheme);
      } catch (error) {
        console.error("Error loading theme settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const setTheme = (themeName) => {
    setCurrentThemeName(themeName);
    localStorage.setItem("selectedTheme", themeName); // 3. Save selected theme
    const selectedTheme = themes.find((t) => t.name === themeName);
    if (selectedTheme) setThemeData(selectedTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        themes,
        config,
        currentThemeName,
        themeData,
        setTheme,
        loading,
        settings
      }}
    >
      {!loading && children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
