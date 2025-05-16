"use client";
import React from "react";
import { Container, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/app/context/ThemeContext";
import GoogleAd from "../features/GoogleAd";

const Banner = ({ title, href }) => {
  const { config, settings } = useThemeContext();
  const router = useRouter();

  return (
    <Container
      maxWidth="xl"
      className="mt-4"
      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
    >
      <div className="relative w-full rounded-lg overflow-hidden shadow-lg mb-4">
        {/* Full-width Ad in place of gradient */}
        <div className="w-full h-full flex items-center justify-center bg-white">
          <GoogleAd />
        </div>

        {/* Overlay content (optional) */}
        <div className="absolute inset-0 flex items-center justify-between px-6 py-3 pointer-events-none">
          {/* Left - Logo + Title */}
          <div className="flex items-center space-x-4 pointer-events-auto">
            <img
              width="120px"
              src={settings?.headerLogo}
              alt="logo"
              className="cursor-pointer"
              onClick={() => router.push("/")}
            />
            <Typography variant="h5" className="text-black font-semibold text-sm md:text-lg">
              {title || "Stay informed, stay ahead with our daily news"}
            </Typography>
          </div>

          {/* Right - Button */}
          <div className="pointer-events-auto">
            <Link href={href}>
              <Button variant="contained" className="shadow-md">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
