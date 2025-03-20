"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@mui/material";
import Loading from "@/app/layout/loading";
import NavLink from "./NavLink";

const Header = () => {
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // Get the current path

  const categories = [
    "Technology", "Science", "Religion", "Politics", "Business",
    "Family", "Car", "Travels", "Sports", "Health", "Education",
    "Entertainment", "Food", "Fashion", "History", "Music", "Art",
    "Gaming", "Environment", "Finance", "Startup", "AI & Machine Learning",
    "Space", "Movies", "Photography", "Books", "Crypto",
  ];

  const handleClick = (category) => {
    setLoading(true);
    setActiveTab(category.toLowerCase());
  };

  // Hide spinner when the pathname changes (page loaded)
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <>
      {/* Global loading spinner (shows in center) */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
          <Loading />
        </div>
      )}

      <div className="bg-gray-200 border-t border-b border-gray-400 hidden md:flex overflow-hidden">
        <Container maxWidth="xl">
          <div className="relative w-full overflow-hidden py-2">
            <div className="flex gap-10 animate-scroll whitespace-nowrap hover:pause-scroll">
              {categories.map((category) => {
                const categoryPath = `/categories-news/${category.toLowerCase()}`;
                return (
                  <NavLink
                    key={category}
                    href={categoryPath}
                    isActive={pathname === categoryPath}
                    onClick={() => handleClick(category)}
                    className={`text-[#1a2e51] font-bold cursor-pointer transition-all duration-300 ${
                      pathname === categoryPath
                        ? "border-b-2 border-[#f20404] text-[#f20404]"
                        : "hover:text-[#ce2b2b]"
                    }`}
                  >
                    {category}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
