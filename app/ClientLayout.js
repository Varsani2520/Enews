"use client";

import { useEffect } from "react";
import Weather from "./Components/Weather";
import Header from "./Components/Header";
import {
  auth,
  registerServiceWorker,
  requestNotificationPermission,
} from "./utils/firebase";
import Navigation from "./Components/Navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "./Components/Footer";
export default function ClientLayout({ children }) {
  const [user] = useAuthState(auth);

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
    <>
      <Weather />
      <Navigation />
      <Header />
      {children}
      <Footer />
    </>
  );
}
