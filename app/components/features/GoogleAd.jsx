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
    <div className="w-full flex justify-center py-4">
      <div className="bg-slate-900 rounded-lg p-4 w-full max-w-[728px]">
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            textAlign: "center",
            width: "100%",
          }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-6580779703282784"
          data-ad-slot="6729903768"
        />
      </div>
    </div>
  );
};

export default GoogleAd;
