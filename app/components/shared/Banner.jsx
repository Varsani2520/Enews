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
      <div className="relative w-full  mx-auto rounded-lg overflow-hidden shadow-lg mb-4">
        {/* Google Ad as background */}
        <div className="w-full h-[90px]">
          <GoogleAd />
        </div>

        {/* Black transparent overlay */}
      
      </div>
    </Container>
  );
};

export default Banner;
