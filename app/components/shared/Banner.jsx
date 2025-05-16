"use client";
import React from "react";
import GoogleAd from "../features/GoogleAd";

const Banner = () => {
  return (
    <div className="mt-4 max-w-screen-lg mx-auto px-4">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <GoogleAd />
      </div>
    </div>
  );
};

export default Banner;
