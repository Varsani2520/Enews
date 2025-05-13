"use client";

import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Box } from "@mui/material";
import { PaletteOutlined } from "@mui/icons-material";
import { useThemeContext } from "@/app/context/ThemeContext";
import Icons from "../shared/Icons";

const ThemeButton = () => {
  const { setTheme, themeData } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [themeList, setThemeList] = useState([]);
  const open = Boolean(anchorEl);

 useEffect(() => {
  const stored = localStorage.getItem("theme");
  try {
    const parsed = JSON.parse(stored);
    if (parsed?.config?.themes) {
      setThemeList(parsed.config.themes);
    }
  } catch (err) {
    console.warn("Invalid theme JSON in localStorage:", stored);
  }
}, []);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (themeKey) => {
    setAnchorEl(null);
    if (themeKey) {
      setTheme(themeKey); // Update theme globally
    }
  };

  if (!themeList || themeList.length === 0) {
    return <div>No themes available</div>; // Handle no themes case
  }

  return (
    <Box>
      {/* Theme Switch Button */}
      <Icons
        onClick={handleClick}
        icon={<PaletteOutlined />}
        sx={{
          color: themeData?.buttonText,
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor: themeData?.primary,
          },
        }}
      />

      {/* Animated Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()} keepMounted>
        {themeList.map((theme) => {
          return (
            <MenuItem key={theme.name} onClick={() => handleClose(theme.name)}>
              <Box
                className="w-5 h-5 rounded-full mr-2"
                style={{ background: theme.background?.card }}
              />
              {theme.name.replace("web-", "").replace("admin-", "").replace("-", " ")}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default ThemeButton;
