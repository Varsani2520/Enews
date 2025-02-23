"use client";

import { useEffect } from "react";
import Weather from "./Components/Weather";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { registerServiceWorker, requestNotificationPermission } from "./utils/firebase";
import Navigation from "./Components/Navigation";

export default function ClientLayout({ children }) {
  useEffect(() => {
    const setupFCM = async () => {
      await registerServiceWorker();
      await requestNotificationPermission();
    };

    setupFCM();
  }, []);

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
