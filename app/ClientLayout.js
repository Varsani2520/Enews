"use client";

import { useEffect } from "react";
import Weather from "./Components/Weather";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {
  auth,
  registerServiceWorker,
  requestNotificationPermission,
} from "./utils/firebase";
import Navigation from "./Components/Navigation";
import { useAuthState } from "react-firebase-hooks/auth";
export default function ClientLayout({ children }) {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (typeof window !== "undefined" && user?.uid) {
      const setupFCM = async () => {
        await registerServiceWorker();
        await requestNotificationPermission(user.uid);
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
