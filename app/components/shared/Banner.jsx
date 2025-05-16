"use client";
import React from "react";
import { Container } from "@mui/material";
import GoogleAd from "../features/GoogleAd";

const Banner = () => {
  return (
    <Container
      maxWidth="xl"
      className="mt-4"
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
        px: 0,                 // Remove horizontal padding to avoid shrinking container
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          overflow: "hidden",   // Hide overflow if any
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <GoogleAd />
      </div>
    </Container>
  );
};

export default Banner;
