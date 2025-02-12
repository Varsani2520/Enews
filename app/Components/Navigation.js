"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Drawer,
  Avatar,
  Typography,
} from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon } from "@mui/icons-material";
import NavLink from "../Reuse/NavLink";
import SearchDialog from "./SearchDialog";
import NavigationDrawer from "./NavigationDrawer";
import Login from "../Models/Login";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const tabs = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "Breaking News", link: "/categories-news/breaking" },
    { name: "Live News", link: "/categories-news/live" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearchOpen = () => setIsDialogOpen(true);
  const handleSearchClose = () => setIsDialogOpen(false);
  const handleLoginOpen = () => setIsLoginDialogOpen(true);
  const handleLoginClose = () => setIsLoginDialogOpen(false);

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
    <AppBar
      position="static"
      sx={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
    >
      <Container maxWidth="xl">
        <Toolbar className="flex justify-between items-center py-4">
          {/* Logo */}
          <img
            src="/logo.png"
            width="120"
            alt="logo"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />

          {/* Burger Menu for Mobile */}
          <div className="md:hidden">
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{ border: "1px solid #ccc" }}
            >
              <MenuIcon sx={{ color: "#1a2e51" }} />
            </IconButton>
          </div>

          {/* Drawer for Mobile */}
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
          <Box className="hidden md:flex gap-8 items-center">
            {tabs.map((tab) => (
              <NavLink
                key={tab.link}
                href={tab.link}
                isActive={activeTab === tab.link}
                onClick={() => setActiveTab(tab.link)}
                className={`text-lg ${
                  activeTab === tab.link
                    ? "text-red-500 font-bold"
                    : "text-[#1a2e51]"
                } hover:text-red-500`}
              >
                {tab.name}
              </NavLink>
            ))}
          </Box>

          {/* User Section and Search */}
          <Box className="hidden md:flex items-center gap-6">
            {user ? (
              <Box className="flex items-center gap-3">
                <Avatar alt={user.username} src={user.profilePicture || ""} />
                <Typography
                  variant="body1"
                  sx={{ color: "#1a2e51", fontWeight: "bold" }}
                >
                  {user.username}
                </Typography>
              </Box>
            ) : (
              <NavLink
                href="#"
                isActive={activeTab === "SignUp"}
                onClick={() => {
                  setActiveTab("SignUp");
                  handleLoginOpen();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Sign Up
              </NavLink>
            )}

            <IconButton
              onClick={handleSearchOpen}
              aria-label="Open Search"
              sx={{ color: "red" }}
            >
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Search Dialog */}
          <SearchDialog open={isDialogOpen} onClose={handleSearchClose} />
          {/* Login Dialog */}
          <Login open={isLoginDialogOpen} onClose={handleLoginClose} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
