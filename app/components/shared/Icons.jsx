import { useThemeContext } from "@/app/context/ThemeContext";
import { Box } from "@mui/material";
import React from "react";

const Icons = ({ onClick, icon, href, sx }) => {
  const { themeData } = useThemeContext();

  return (
    <Box
      onClick={onClick}
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        color: themeData.navText, 
        cursor:"pointer",
        textDecoration: "none",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)", // Slight increase in size
        },
        ...sx,
      }}
    >
      {icon}
    </Box>
  );
};

export default Icons;
