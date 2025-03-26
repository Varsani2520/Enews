"use client";

import { useEffect } from "react";

export default function OneSignalProvider() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async (OneSignal) => {
        await OneSignal.init({
          appId: "86fb4ef8-e891-4f88-aef7-b291f618df78", // Replace with your App ID
        });
      });
    }
  }, []);

  return null; // No UI, just runs the script
}
