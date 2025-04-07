"use client";
import { useEffect } from "react";

export default function GoogleAd({ slot,format,style={display:"block",textAlign:"center"}}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-6580779703282784"
      data-ad-slot={slot}
      data-ad-layout="in-article"
      data-ad-format={format}/>
  );
}
