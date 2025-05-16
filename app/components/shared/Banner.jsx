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
      disableGutters
      className="mt-4"
      sx={{ display: { xs: "none", sm: "none", md: "block" },height:"90px",width:"1200px"}}
    >
      <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
        <GoogleAd />
      </div>
    </Container>

  );
};

export default Banner;
