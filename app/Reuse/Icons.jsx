import { IconButton } from "@mui/material";
import React from "react";

const Icons = ({ onClick, icon, props, href }) => {
  return (
    <IconButton
      onClick={onClick}
      {...props}
      color="inherit"
      href={href}
      target="_blank"
      sx={{
        "&:hover": {
          background: "#ce2b2b",
          borderRadius: "5px"
        },
      }}
    >
      {icon}
    </IconButton>
  );
};

export default Icons;
