"use client";

import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Box } from "@mui/material";
import { PaletteOutlined } from "@mui/icons-material";
import { useThemeContext } from "@/app/context/ThemeContext";
import Icons from "../shared/Icons";

const ThemeButton = () => {
  const { setTheme, themeData, themes, currentThemeName } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (themeKey) => {
    setAnchorEl(null);
    if (themeKey) {
      setTheme(themeKey); // Update theme globally
    }
  };
  if (!themes || themes.length === 0) {
    return <div>No themes available</div>;
  }
  return (
    <Box>
      {/* Theme Switch Button */}
      <Icons
        onClick={handleClick}
        icon={<PaletteOutlined />}
        sx={{
          color: themeData?.text?.primary, background: themeData?.icon?.default, cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor: themeData?.background?.button,
          },
        }}
        aria-label="Open theme selector"
      />

      {/* Animated Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()} keepMounted >
        {themes.map((theme) => {
          const isSelected = theme.name === currentThemeName;
          return (
            <MenuItem key={theme.name} onClick={() => handleClose(theme.name)} sx={{
              backgroundColor: isSelected ? theme.background?.header : 'transparent', // Highlight selected item
              color: isSelected ? theme.text?.primary:""
            }}>
              <Box
                className="w-5 h-5 rounded-full mr-2"
                style={{ background: theme.background?.card }}
              />
              {theme.name.replace("web-", "").replace("-", " ")}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default ThemeButton;
