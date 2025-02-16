"use client";
import React from "react";
import { Container, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Banner = ({ title, href }) => {
  const router = useRouter();
  return (
    <Container
      maxWidth="xl"
      className="mt-4"
      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
    >
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg shadow-lg mb-4">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            width="120px"
            src="/logo.png"
            alt="logo"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />{" "}
          <Typography variant="h5" className="font-bold">
            {title || "Stay informed, stay ahead with our daily news"}
          </Typography>
        </div>

        {/* Right side - Read More button */}
        <Link href={href}>
          <Button variant="contained" className="mx-4 shadow-md">
            Read More
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Banner;
