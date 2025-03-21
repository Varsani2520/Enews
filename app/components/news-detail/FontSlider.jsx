import React, { useState } from "react";
import { Slider, Typography, Box } from "@mui/material";
import { useThemeContext } from "@/app/context/ThemeContext";

const fontSizes = [12,14, 16, 18, 20, 22,24];

const FontSizeSlider = ({ fontSize, setFontSize }) => {
const {themeData}=useThemeContext()

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" ,color:themeData.cardText}}>
        Font Size
      </Typography>
      <Slider
                    value={fontSize}
                    onChange={(_, newValue) => setFontSize(newValue)}
                    step={2}
                    marks={fontSizes.map(size => ({ value: size, label: `${size}px` }))}
                    min={12}
                    max={24}
                    valueLabelDisplay="auto"
                    sx={{ width: "60%", color: themeData.cardText }}
                />
      
    </Box>
  );
};

export default FontSizeSlider;
