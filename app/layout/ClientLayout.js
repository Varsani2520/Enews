"use client";

import { useEffect } from "react";
import Weather from "../components/layout/Weather";
import Navigation from "../components/layout/Navigation";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useThemeContext } from "../context/ThemeContext";
export default function ClientLayout({ children }) {
  const { themeData } = useThemeContext();

  useEffect(() => { }, [themeData])

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
