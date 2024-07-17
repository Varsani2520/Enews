'use client'
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Container,
  Box,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import NavLink from "../Reuse/NavLink";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <Container maxWidth="xl" className="pt-1 pb-1">
      <div position="static" className="bg-white text-black mb-4">
        <Toolbar className="flex justify-between items-center">
          {/* Logo */}
          <img src="/logo.png" width="10%" height="auto" alt="logo"/>
 
          {/* Navigation Links */}
          <Box className="flex gap-6 items-center">
            <NavLink
              to="/"
              isActive={activeTab === "home"}
              onClick={() => setActiveTab("home")}
              className={`text-black ${
                activeTab === "home" ? "border-b-2 border-red-500" : ""
              }`}
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              isActive={activeTab === "about"}
              onClick={() => setActiveTab("about")}
              className={`text-black ${
                activeTab === "about" ? "border-b-2 border-red-500" : ""
              }`}
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact-us"
              isActive={activeTab === "contact"}
              onClick={() => setActiveTab("contact")}
              className={`text-black ${
                activeTab === "contact" ? "border-b-2 border-red-500" : ""
              }`}
            >
              Contact
            </NavLink>
            <NavLink
              to="/all_breaking_news"
              isActive={activeTab === "breaking"}
              onClick={() => setActiveTab("breaking")}
              className={`text-black ${
                activeTab === "breaking" ? "border-b-2 border-red-500" : ""
              }`}
            >
              Breaking News
            </NavLink>
            <NavLink
              to="/categories"
              isActive={activeTab === "categories"}
              onClick={() => setActiveTab("categories")}
              className={`text-black ${
                activeTab === "categories" ? "border-b-2 border-red-500" : ""
              }`}
            >
              Categories
            </NavLink>
            <NavLink
              to="/login"
              isActive={activeTab === "login"}
              onClick={() => setActiveTab("login")}
              className={`text-black ${
                activeTab === "login" ? "border-b-2 border-red-500" : ""
              }`}
            >
              Login
            </NavLink>
          </Box>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              className="pl-12 pr-4 py-2 w-full"
            />
          </div>
        </Toolbar>
      </div>
    </Container>
  );
};

export default Navigation;
