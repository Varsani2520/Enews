import React from "react";
import Link from "next/link";

const NavLink = ({ to, isActive, children, ...props }) => {
  const activeClasses = isActive
    ? "border-b-2 border-red-500"
    : "border-b-2 border-transparent";

  return (
    <Link
      href={to}
      className={`inline-block text-black px-4 py-2 transition duration-300 ease-in-out ${activeClasses}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
