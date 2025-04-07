"use client";

import { Inter } from "next/font/google";
import { ArticleProvider } from "./context/ArticleContext";
import ClientLayout from "./layout/ClientLayout";
import { Toaster } from "react-hot-toast";
import "./styles/globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6580779703282784"
     crossorigin="anonymous"></script>
      </head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

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
