"use client";

import { useEffect } from "react";

import {
  auth,
  registerServiceWorker,
  requestNotificationPermission,
} from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Weather from "../components/layout/Weather";
import Navigation from "../components/layout/Navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useThemeContext } from "../context/ThemeContext";
export default function ClientLayout({ children }) {
  const [user] = useAuthState(auth);
  const { themeData } = useThemeContext();
  console.log("themeData", themeData);
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
  }, [user]);

  return (
    <div style={{ background: themeData.navigation }}>
      <Weather />
      <Navigation />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
