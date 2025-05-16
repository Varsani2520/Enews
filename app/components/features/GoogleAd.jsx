"use client";
import { useEffect } from "react";

const GoogleAd = () => {
 useEffect(() => {
  console.log("GoogleAd mounted");
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    console.log("Ad pushed");
  } catch (e) {
    console.error("Adsbygoogle error:", e);
  }
}, []);


  return (
    <ins
      className="adsbygoogle"
      style={{ display: "inline-block", width: "1200px", height: "90px" }}
      data-ad-client="ca-pub-6580779703282784"
      data-ad-slot="1338579894"
    />

  );
};

export default GoogleAd;
