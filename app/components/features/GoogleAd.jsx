"use client";
import { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Adsbygoogle error:", e);
      }
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
        width: "100%",         // full width of parent container
        maxWidth: "1200px",    // max width for large screens
        height: "90px",
        margin: "0 auto",      // center horizontally if smaller than maxWidth
      }}
      data-ad-client="ca-pub-6580779703282784"
      data-ad-slot="1338579894"
    />
  );
};

export default GoogleAd;
