"use client";
import React from "react";
import GoogleAd from "../features/GoogleAd";

const Banner = () => {
  return (
    <div className="w-full bg-transparent py-4">
      {/* Match container with navbar (likely same as the one in layout/header) */}
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="rounded-lg overflow-hidden shadow">
          <GoogleAd />
        </div>
      </div>
    </div>
  );
};

export default Banner;
