"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon } from "@mui/icons-material";
import NavLink from "../Reuse/NavLink";
import SearchDialog from "./SearchDialog";
import NavigationDrawer from "./NavigationDrawer";
import Login from "../Models/Login";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const handleSearchOpen = () => {
    setIsDialogOpen(true);
  };

  const handleSearchClose = () => {
    setIsDialogOpen(false);
  };
  const handleLoginOpen = () => {
    setIsLoginDialogOpen(true); // Open LoginDialog
  };

  const handleLoginClose = () => {
    setIsLoginDialogOpen(false); // Close LoginDialog
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <Container maxWidth="xl">
      <div position="static" className="bg-white text-[#1a2e51]">
        <Toolbar className="flex justify-between items-center">
          {/* Logo */}
          <img src="/logo.png" width="10%" alt="logo" />
          {/* Burger Menu for Medium Devices */}
          <div className="md:hidden border border-black border-solid border-opacity-50 space-x-3 rounded-lg">
            {" "}
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </div>

          {/* Drawer */}
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            <NavigationDrawer
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleSearchOpen={handleSearchOpen}
            />
          </Drawer>

          {/* Navigation Links */}
          <Box className="hidden md:flex gap-6 items-center justify-end">
            <NavLink
              href="/"
              isActive={activeTab === "home"}
              onClick={() => setActiveTab("home")}
              className={`text-["#1a2e51"] cursor-pointer ${
                activeTab === "home" ? "border-b-2 border-red-500" : ""
              }`}
            >
              Home
            </NavLink>
            <NavLink
              href="/about-us"
              isActive={activeTab === "about"}
              onClick={() => setActiveTab("about")}
              className={` cursor-pointer ${
                activeTab === "about" ? "border-b-2 border-red-500" : ""
              }`}
            >
              About Us
            </NavLink>
            <NavLink
              href="/all_breaking_news"
              isActive={activeTab === "breaking"}
              onClick={() => setActiveTab("breaking")}
              className={` cursor-pointer ${
                activeTab === "breaking" ? "border-b-2 border-red-500" : ""
              }`}
            >
              Breaking News
            </NavLink>
            <NavLink
              href="/categories"
              isActive={activeTab === "categories"}
              onClick={() => setActiveTab("categories")}
              className={` cursor-pointer${
                activeTab === "categories" ? "border-b-2 border-red-500" : ""
              }`}
            >
              Categories
            </NavLink>
            <NavLink
              href="/contact-us"
              isActive={activeTab === "contact"}
              onClick={() => setActiveTab("contact")}
              className={` cursor-pointer ${
                activeTab === "contact" ? "border-b-2 border-red-500" : ""
              }`}
            >
              Contact
            </NavLink>
          </Box>

          {/* Search Input */}
          <div className="relative hidden md:flex items-center cursor-pointer space-x-4">
            <NavLink
              href="#"
              isActive={activeTab === "SignUp"}
              onClick={() => {
                setActiveTab("SignUp");
                handleLoginOpen();
              }}
              className={`text-white bg-red-500 rounded cursor-pointer${
                activeTab === "login" ? "border-b-2 border-red-500" : ""
              }`}
            >
              Sign Up
            </NavLink>
            <IconButton
              onClick={handleSearchOpen}
              aria-label="search"
              style={{ color: "red" }}
            >
              <SearchIcon />
            </IconButton>
            <SearchDialog open={isDialogOpen} onClose={handleSearchClose} />
          </div>
          <Login open={isLoginDialogOpen} onClose={handleLoginClose} />
        </Toolbar>
      </div>
    </Container>
  );
};

export default Navigation;
