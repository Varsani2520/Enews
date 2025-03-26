"use client";

import React, { useState } from "react";
import { Menu, MenuItem, Box } from "@mui/material";
import { PaletteOutlined } from "@mui/icons-material";
import themes from "@/app/utils/theme";
import { useThemeContext } from "@/app/context/ThemeContext";
import Icons from "../shared/Icons";

const ThemeButton = () => {
  const { setTheme, themeData } = useThemeContext();
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
      {/* Theme Switch Button */}
      <Icons
        onClick={handleClick}
        icon={<PaletteOutlined />}
        sx={{
          color: themeData.buttonText,
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor: themeData.primary,
          },
        }}
      />

      {/* Animated Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()} keepMounted>
              {themes &&
                Object.keys(themes).map((themeKey) => (
                  <MenuItem
                    key={themeKey}
                    onClick={() => handleClose(themeKey)}                    
                  >
                    <Box
                      className="w-5 h-5 rounded-full mr-2"
                      style={{
                        background: themes[themeKey]?.primary || "#000",
                      }}
                    />
                    {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                  </MenuItem>
                ))}
      </Menu>
    </Box>
  );
};

export default ThemeButton;
