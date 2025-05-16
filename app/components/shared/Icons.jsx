import { useThemeContext } from "@/app/context/ThemeContext";
import React from "react";

const Icons = ({ onClick, icon, href, sx, ariaLabel }) => {
  const { themeData } = useThemeContext();

  return (
    <a
      onClick={onClick}
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        color: themeData?.icon?.default, 
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
    </a>
  );
};

export default Icons;
