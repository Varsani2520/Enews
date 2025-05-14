"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@mui/material";
import Loading from "@/app/layout/loading";
import NavLink from "./NavLink";
import { useThemeContext } from "@/app/context/ThemeContext";
import { useHomeContext } from "@/app/utils/useHome";

const Header = () => {
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // Get the current path
  const { themeData } = useThemeContext()
  const { homeData: news } = useHomeContext();
  const categories = news?.categories || [];

  const handleClick = (slug) => {
    setLoading(true);
    setActiveTab(slug);
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

      <div className="border-t border-b border-gray-400 hidden md:flex overflow-hidden" style={{ background: themeData?.background?.header, color: themeData?.text?.primary }}>
        <Container maxWidth="xl">
          <div className="relative w-full overflow-hidden py-2">
            <div className="flex gap-10 animate-scroll whitespace-nowrap hover:pause-scroll">
              {categories?.map((category) => {
                const categoryPath = `/categories-news/${category.slug}`;
                return (
                  <NavLink
                    key={category._id}
                    href={categoryPath}
                    isActive={pathname === categoryPath}
                    onClick={() => handleClick(category.slug)}
                    className={` font-bold cursor-pointer transition-all duration-300 ${pathname === categoryPath
                        ? "border-b-2 border-[#f20404]"
                        : "hover:text-[#ce2b2b]"
                      }`}

                  >
                    {category.name}
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
