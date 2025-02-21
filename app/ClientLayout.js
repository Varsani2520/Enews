"use client";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navigation from "./Components/Navigation";
import Weather from "./Components/Weather";

export default function ClientLayout({ children }) {
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
