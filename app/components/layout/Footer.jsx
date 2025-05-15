"use client";
import React, { useState } from "react";
import { Typography, Divider } from "@mui/material";
import Link from "next/link";
import { useThemeContext } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { config } = useThemeContext();
  const router = useRouter();

  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div>
          <img
            src={config?.footerLogo}
            alt="logo"
            className="w-32 cursor-pointer mb-4"
            onClick={() => router.push("/")}
          />
          <Typography variant="body2" className="text-sm text-gray-300 leading-relaxed">
            News Web Website is an online platform that provides news and
            information about current events, entertainment, politics, sports,
            technology, and more.
          </Typography>
        </div>

        {/* Navigation */}
        <div>
          <Typography variant="h6" className="text-lg font-semibold mb-2">
            Navigations
          </Typography>
          <Divider className="bg-gray-700" />
          <ul className="space-y-2 text-sm text-gray-400 mt-4">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/categories-news/live-news" className="hover:text-white">Live News</Link></li>
            <li><Link href="/categories-news/breaking-news" className="hover:text-white">Breaking News</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <Typography variant="h6" className="text-lg font-semibold mb-2">
            Categories
          </Typography>
          <Divider className="bg-gray-700 " />
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400 mt-4">
            {[
              "technology",
              "science",
              "religion",
              "politics",
              "business",
              "family",
              "top-news",
              "cars",
              "travels",
              "sports",
              "health",
            ].map((category) => (
              <li key={category}>
                <Link
                  href={`/categories-news/${category}`}
                  className="capitalize hover:text-white"
                >
                  {category.replace("-", " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} News Web Website. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
