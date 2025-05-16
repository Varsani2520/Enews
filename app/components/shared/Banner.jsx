"use client";
import React from "react";
import { Container, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/app/context/ThemeContext";
import GoogleAd from "./GoogleAd";

const Banner = ({ title, href }) => {
  const { settings } = useThemeContext();
  const router = useRouter();

  return (
    <Container
      maxWidth="xl"
      className="mt-4"
      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
    >
      <div className="relative rounded-lg overflow-hidden shadow-lg mb-4 h-[120px]">
        {/* Background ad with opacity */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <GoogleAd />
        </div>

        {/* Overlay content on top of ad */}
        <div className="relative z-10 flex items-center justify-between h-full bg-gradient-to-r from-transparent to-transparent px-6">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => router.push("/")}>
            <img
              src={settings?.headerLogo}
              alt="logo"
              width={120}
              height={40}
              className="object-contain"
            />
            <Typography variant="h5" className="font-semibold text-black text-sm md:text-lg">
              {title || "Stay informed, stay ahead with our daily news"}
            </Typography>
          </div>

          {/* Right side - Button */}
          <Link href={href}>
            <Button variant="contained" className="shadow-md">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
