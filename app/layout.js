"use client";

import { Inter } from "next/font/google";
import { ArticleProvider } from "./context/ArticleContext";
import ClientLayout from "./layout/ClientLayout";
import { Toaster } from "react-hot-toast";
import "./styles/globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
import OneSignalProvider from "./utils/oneSignalProvider";

const inter = Inter({ subsets: ["latin"] });



// ✅ **New Route Segment Config for AMP**
export const segmentConfig = {
  amp: "hybrid", // Enables AMP in Next.js App Router
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* OneSignal SDK */}
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>

        {/* AMP Auto Ads Script */}
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        ></script>
      </Head>
      <body className={inter.className}>
        <OneSignalProvider/>
        {/* AMP Auto Ads */}
        <amp-auto-ads
          type="adsense"
          data-ad-client="ca-pub-6580779703282784"
        ></amp-auto-ads>

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
