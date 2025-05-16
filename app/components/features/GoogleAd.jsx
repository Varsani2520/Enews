"use client";
import { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("Adsbygoogle error:", e);
    }
  }, []);

  return (
    <ins
        className="adsbygoogle"
      style={{ display: "inline-block", width: 728, height: 90 }}
      data-ad-client="ca-pub-6580779703282784"
      data-ad-slot="6729903768"
    />
  );
};

export default GoogleAd;
