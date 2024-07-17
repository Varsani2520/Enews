import React from "react";
import { Typography } from "@mui/material";

const NavLink = ({ to, isActive, children, ...props }) => {
  const activeClasses = isActive
    ? "border-b-2 border-red-[#f20404]"
    : "border-b-2 border-transparent";

  return (
    <Typography
      component="a"
      to={to}
      className={`inline-block text-black px-4 py-2 transition duration-300 ease-in-out ${activeClasses}`}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default NavLink;
