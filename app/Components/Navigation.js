"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  AccountCircle,
} from "@mui/icons-material";
import NavLink from "../Reuse/NavLink";
import SearchDialog from "./SearchDialog";
import NavigationDrawer from "./NavigationDrawer";
import Login from "../Models/Login";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const tabs = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "Breaking News", link: "/categories-news/breaking" },
    { name: "Categories", link: "/categories-news" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = localStorage.getItem("users");
    console.log(storedUser);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
            {tabs.map((tab) => (
              <NavLink
                key={tab.link}
                href={tab.link}
                isActive={activeTab === tab.link}
                onClick={() => setActiveTab(tab.link)}
                className={`cursor-pointer ${
                  activeTab === tab.link ? "border-b-2 border-red-500" : ""
                }`}
              >
                {tab.name}
              </NavLink>
            ))}
          </Box>

          {/* Search Input */}
          {/* User Section */}
          <div className="relative hidden md:flex items-center cursor-pointer space-x-4">
            {user ? (
              <>
                <p>{user.displayName}</p>
              </>
            ) : (
              <NavLink
                href="#"
                isActive={activeTab === "SignUp"}
                onClick={() => {
                  setActiveTab("SignUp");
                  handleLoginOpen();
                }}
                className={`text-white bg-red-500 rounded px-3 py-1 cursor-pointer ${
                  activeTab === "SignUp" ? "border-b-2 border-red-500" : ""
                }`}
              >
                Sign Up
              </NavLink>
            )}

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
