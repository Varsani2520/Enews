"use client";

import { Inter } from "next/font/google";
import ClientLayout from "./layout/ClientLayout";
import { Toaster } from "react-hot-toast";
import "./styles/globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { CssBaseline } from "@mui/material";
import { FavoritesProvider } from "./context/FavoritesContext";
import { HomeProvider } from "./utils/useHome";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6580779703282784"
          crossOrigin="anonymous"
        ></script>
      </head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <body className={inter.className}>
        <Toaster />
        <AuthProvider>
          <ThemeProvider>
            <CssBaseline />
            <HomeProvider>
              <FavoritesProvider>
                <ClientLayout>{children}</ClientLayout>
              </FavoritesProvider>
            </HomeProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
