"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ArticleProvider } from "./context/ArticleContext";
import ClientLayout from "./ClientLayout";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ArticleProvider>
          <ClientLayout>{children}</ClientLayout>
        </ArticleProvider>
      </body>
    </html>
  );
}
