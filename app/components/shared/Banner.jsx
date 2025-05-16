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
      sx={{ display: { xs: "none", sm: "none", md: "block" },height: "100px"  }}
    >
      <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
        {/* Google Ad as background */}
        <GoogleAd />

        {/* Black transparent overlay */}

      </div>
    </Container>
  );
};

export default Banner;
