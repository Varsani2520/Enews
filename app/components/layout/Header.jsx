"use client";
import React, { useState } from "react";
import { Container } from "@mui/material";
import NavLink from "./NavLink";

const Header = () => {
  const [activeTab, setActiveTab] = useState("");

  const categories = [
    "Technology",
    "Science",
    "Religion",
    "Politics",
    "Business",
    "Family",
    "Car",
    "Travels",
    "Sports",
    "Health",
    "Education",
    "Entertainment",
    "Food",
    "Fashion",
    "History",
    "Music",
    "Art",
    "Gaming",
    "Environment",
    "Finance",
    "Startup",
    "AI & Machine Learning",
    "Space",
    "Movies",
    "Photography",
    "Books",
    "Crypto",
  ];

  return (
    <div className="bg-gray-200 border-t border-b border-gray-400 hidden md:flex overflow-hidden">
      <Container maxWidth="xl">
        <div className="relative w-full overflow-hidden py-2">
          <div className="flex gap-10 animate-scroll whitespace-nowrap hover:pause-scroll">
            {categories.map((category) => (
              <NavLink
                key={category}
                href={`/categories-news/${category.toLowerCase()}`}
                isActive={activeTab === category.toLowerCase()}
                onClick={() => setActiveTab(category.toLowerCase())}
                className={`text-[#1a2e51] font-bold cursor-pointer transition-all duration-300 ${
                  activeTab === category.toLowerCase()
                    ? "border-b-2 border-[#f20404] text-[#f20404]"
                    : "hover:text-[#ce2b2b]"
                }`}
              >
                {category}
              </NavLink>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
