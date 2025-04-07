"use client";
import { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    try {
      if (window) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("Adsbygoogle error:", e);
    }
  }, []);

  return (
    <>
      {/* Google AdSense Script (added only once globally, ideally in _document.tsx or layout) */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-6580779703282784"
        data-ad-slot="6729903768"
      />
    </>
  );
};

export default GoogleAd;
