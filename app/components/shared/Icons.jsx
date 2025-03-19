import { Box } from "@mui/material";
import React from "react";

const Icons = ({ onClick, icon, props, href ,sx}) => {
  return (
    <Box
      onClick={onClick}
      {...props}
      color="inherit"
      href={href}
      target="_blank"
      
      sx={{
        padding: "5px", ...sx
      }}
    >
      {icon}
    </Box>
  );
};

export default Icons;
