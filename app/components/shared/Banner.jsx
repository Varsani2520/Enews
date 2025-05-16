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
      <div className="relative w-full max-w-[728px] mx-auto rounded-lg overflow-hidden shadow-lg mb-4">
        {/* Google Ad as background */}
        <div className="w-full h-[90px]">
          <GoogleAd />
        </div>

        {/* Black transparent overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-6 py-3">
          {/* Left side - Logo + Title */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => router.push("/")}>
            <img
              width="120px"
              src={settings?.headerLogo}
              alt="logo"
            />
            <Typography variant="h5" className="text-white font-semibold text-sm md:text-lg">
              {title || "Stay informed, stay ahead with our daily news"}
            </Typography>
          </div>

          {/* Right side - Read More button */}
          <Link href={href}>
            <Button variant="contained" className="shadow-md pointer-events-auto">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
