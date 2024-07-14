import React from "react";
import { Typography } from "@mui/material";

const NavLink = ({ href, isActive, children, ...props }) => {
  const activeClasses = isActive
    ? "border-b-2 border-red-500"
    : "border-b-2 border-transparent";

  return (
    <Typography
      component="a"
      href={href}
      className={`inline-block text-black px-4 py-2 transition duration-300 ease-in-out ${activeClasses}`}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default NavLink;
