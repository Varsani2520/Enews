"use client";

import React, { useState } from "react";
import { Menu, MenuItem, Button, Box } from "@mui/material";
import { PaletteOutlined } from "@mui/icons-material";
import { themes } from "@/app/utils/theme";
import { useThemeContext } from "@/app/context/ThemeContext";

const ThemeButton = () => {
  const { setTheme } = useThemeContext();
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

  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="contained"
        startIcon={<PaletteOutlined />}
        style={{ backgroundColor: themes.default.primary, color: themes.default.text }}
      >
        Themes
      </Button>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose(null)}>
        {Object.keys(themes).map((themeKey) => (
          <MenuItem key={themeKey} onClick={() => handleClose(themeKey)}>
            <Box
              className="w-5 h-5 rounded-full mr-2"
              style={{ background: themes[themeKey].primary }}
            />
            {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ThemeButton;
