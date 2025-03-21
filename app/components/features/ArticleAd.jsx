"use client";
import { useEffect, useRef } from "react";

const InArticleAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return; // Prevent running if ref is not set
    try {
      if (window && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="my-6">
      <ins
        ref={adRef} // Assign ref to prevent re-pushing ads
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-6580779703282784" // Replace with your AdSense Publisher ID
        data-ad-slot="6729903768" // Replace with your Ad Slot ID
      ></ins>
    </div>
  );
};

export default InArticleAd;
