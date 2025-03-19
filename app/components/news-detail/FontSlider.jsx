import React, { useState } from "react";
import { Slider, Typography, Box } from "@mui/material";

const marks = [
  { value: 14, label: "14px" },
  { value: 16, label: "16px" },
  { value: 18, label: "18px" },
  { value: 20, label: "20px" },
  { value: 22, label: "22px" },
  { value: 24, label: "24px" },
];

const FontSizeSlider = ({ onChange }) => {
  const [fontSize, setFontSize] = useState(18);

  const handleChange = (newValue) => {
    setFontSize(newValue);
    onChange(newValue);
  };

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
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        Font Size
      </Typography>
      <Slider
        value={fontSize}
        onChange={handleChange}
        min={14}
        max={24}
        step={2}
        marks={marks}
        sx={{ width: "60%", color: "#0056b3" }}
      />
      
    </Box>
  );
};

export default FontSizeSlider;
