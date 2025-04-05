"use client";

import { Inter } from "next/font/google";
import { ArticleProvider } from "./context/ArticleContext";
import ClientLayout from "./layout/ClientLayout";
import { Toaster } from "react-hot-toast";
import "./styles/globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { CssBaseline } from "@mui/material";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });



// ✅ **New Route Segment Config for AMP**
export const segmentConfig = {
  amp: "hybrid", // Enables AMP in Next.js App Router
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      {/* ✅ AMP Auto Ads Script */}
      <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        ></script>

        {/* ✅ Standard Google AdSense Script (For Non-AMP) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        {/* ✅ AMP Auto Ads (Only Render for AMP Pages) */}
        {segmentConfig.amp === "hybrid" && (
          <amp-auto-ads type="adsense" data-ad-client="ca-pub-6580779703282784"></amp-auto-ads>
        )}

        {/* ✅ Normal Google Ads (For Non-AMP Pages) */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6580779703282784"
          data-ad-slot="1234567890" // Replace with actual Ad Slot
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

        <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </script>

        <Toaster />
        <ThemeProvider>
          <CssBaseline />
          <ArticleProvider>
            <ClientLayout>{children}</ClientLayout>
          </ArticleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
