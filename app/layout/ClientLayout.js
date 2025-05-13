"use client";

import { useEffect } from "react";

import {
  registerServiceWorker,
  requestNotificationPermission,
} from "../utils/firebase";
import Weather from "../components/layout/Weather";
import Navigation from "../components/layout/Navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useThemeContext } from "../context/ThemeContext";
import useCurrentUser from "../hooks/useCurrentUser";
export default function ClientLayout({ children }) {
  const user = useCurrentUser();
  const { themeData } = useThemeContext();

  useEffect(() => {
    if (typeof window !== "undefined" && user?.uid) {
      const setupFCM = async () => {
        await registerServiceWorker();
        // Run after a short delay or user action
        setTimeout(() => {
          requestNotificationPermission(user.uid);
        }, 2000); // Small delay to prevent blocking
      };

      setupFCM();
    }
  }, [user,themeData]);

  return (
    <div style={{ background: themeData?.background?.body }}>
      <Weather />
      <Navigation />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
