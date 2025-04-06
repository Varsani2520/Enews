"use client";

import { Inter } from "next/font/google";
import { ArticleProvider } from "./context/ArticleContext";
import ClientLayout from "./layout/ClientLayout";
import { Toaster } from "react-hot-toast";
import "./styles/globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });



// ✅ **New Route Segment Config for AMP**
export const segmentConfig = {
  amp: "hybrid", // Enables AMP in Next.js App Router
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6580779703282784"
     crossorigin="anonymous"></script>
      </head>

      <body className={inter.className}>
       

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
