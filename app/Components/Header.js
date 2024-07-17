'use client'
import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import NavLink from "../Reuse/NavLink";

const Header = () => {
  const [activeTab, setActiveTab] = useState("technology"); // Example state for active tab

  return (
    <div className="bg-gray-200 border-t border-b border-gray-400">
    <Container maxWidth="xl">
     
      <div className="flex gap-20 py-2">
          
        <NavLink
          href="/categories-news/technology"
          isActive={activeTab === "technology"}
          onClick={() => setActiveTab("technology")}
          className={`text-black font-bold ${
            activeTab === "technology" ? "border-b-2 border-red-[#f20404]" : ""
          }`}
        >
          Technology
        </NavLink>
        <NavLink
          href="/categories-news/science"
          isActive={activeTab === "science"}
          onClick={() => setActiveTab("science")}
          className={`text-black font-bold ${
            activeTab === "science" ? "border-b-2 border-red-[#f20404]" : ""
          }`}
        >
          Science
        </NavLink>
        <NavLink
          href="/categories-news/religion"
          isActive={activeTab === "religion"}
          onClick={() => setActiveTab("religion")}
          className={`text-black font-bold ${
            activeTab === "religion" ? "border-b-2 border-red-[#f20404]" : ""
          }`}
        >
          Religion
        </NavLink>
        <NavLink
          href="/categories-news/politics"
          isActive={activeTab === "politics"}
          onClick={() => setActiveTab("politics")}
          className={`text-black font-bold ${
            activeTab === "politics" ? "border-b-2 border-red-[#f20404]" : ""
          }`}
        >
          Politics
        </NavLink>
        <NavLink
          href="/categories-news/business"
          isActive={activeTab === "business"}
          onClick={() => setActiveTab("business")}
          className={`text-black font-bold ${
            activeTab === "business" ? "border-b-2 border-red-[#f20404]" : ""
          }`}
        >
          Business
        </NavLink>
        <NavLink
          href="/categories-news/family"
          isActive={activeTab === "family"}
          onClick={() => setActiveTab("family")}
          className={`text-black font-bold ${
            activeTab === "family" ? "border-b-2 border-red-[#f20404]" : ""
          }`}
        >
          Family
        </NavLink>
        <NavLink
          href="/categories-news/car"
          isActive={activeTab === "car"}
          onClick={() => setActiveTab("car")}
          className={`text-black font-bold ${
            activeTab === "car" ? "border-b-2 border-red-[#f20404]" : ""
          }`}
        >
          Car
        </NavLink>
        <NavLink
          href="/categories-news/travels"
          isActive={activeTab === "travels"}
          onClick={() => setActiveTab("travels")}
          className={`text-black font-bold ${
            activeTab === "travels" ? "border-b-2 border-red-[#f20404]" : ""
          }`}
        >
          Travels
        </NavLink>
        <NavLink
          href="/categories-news/sports"
          isActive={activeTab === "sports"}
          onClick={() => setActiveTab("sports")}
          className={`text-black font-bold ${
            activeTab === "sports" ? "border-b-2 border-red-[#f20404]" : ""
          }`}
        >
          Sports
        </NavLink>
      </div>

    </Container>
    </div>
  );
};

export default Header;
