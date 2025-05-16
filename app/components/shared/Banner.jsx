"use client";
import React from "react";
import { Container } from "@mui/material";
import GoogleAd from "../features/GoogleAd";

const Banner = () => {
  return (
    <Container
      maxWidth="xl"
      className="mt-4"
      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
    >
      <div className="w-full mx-auto overflow-hidden rounded-lg  mb-4">
        <GoogleAd />
      </div>
    </Container>
  );
};

export default Banner;
