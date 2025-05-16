"use client";
import React from "react";
import { Container } from "@mui/material";
import GoogleAd from "../features/GoogleAd";

const Banner = () => {
  return (
    <Container
      maxWidth="xl"
      className="mt-4 flex justify-center overflow-visible"
      sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
    >
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        <GoogleAd />
      </div>
    </Container>
  );
};

export default Banner;
