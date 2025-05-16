"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  IconButton,
  Drawer,
  Avatar,
  Typography,
} from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon } from "@mui/icons-material";

import { useRouter } from "next/navigation";
import Link from "next/link";
import NavLink from "./NavLink";
import LoginDialog from "@/app/Models/Login";
import NavigationDrawer from "./NavigationDrawer";
import SearchDialog from "../features/SearchDialog";
import { useThemeContext } from "@/app/context/ThemeContext";
import { useAuth } from "@/app/context/AuthContext";
import Loading from "@/app/layout/loading";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const { user } = useAuth();
  const router = useRouter();
  const { themeData, config, settings } = useThemeContext();

  const tabs = [
    { name: "Home", link: "/" },
    { name: "Breaking News", link: "/categories-news/breaking" },
    { name: "Featured News", link: "/categories-news/featured" },
    { name: "Entertainment", link: "/categories-news/Entertainment" },
  ];

  const handleSearchOpen = () => {
    setIsDialogOpen(true);
    setIsDrawerOpen(false); // Close the drawer when opening search
  };
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

  const handleNavigate = (link) => {
    setLoading(true);
    setActiveTab(link);
    router.push(link);
  };

  useEffect(() => {
    setLoading(false); // hide loading once mounted on new route
  }, []);

  return (
    <Container maxWidth="xl">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-[9999]">
          <Loading />
        </div>
      )}
      <div className="flex justify-between items-center py-4">
        {/* Logo */}
        <img
          width="120px"
          src={settings?.headerLogo}
          alt="logo"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* Burger Menu for Mobile */}
        <div className="md:hidden">
          <IconButton
            aria-label="Open Menu"
            onClick={toggleDrawer(true)}
            sx={{
              border: `1px solid ${themeData?.border}`,
              borderRadius: config?.borderRadius,
            }}
          >
            <MenuIcon sx={{ color: themeData?.navText }} />
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
              className="text-lg transition-colors duration-300"
              style={{
                color:
                  activeTab === tab.link
                    ? themeData?.background?.button // Ensure visibility
                    : themeData?.text?.primary, // Fallback to readable color
                fontWeight: activeTab === tab.link ? "bold" : "normal",
              }}
            >
              {tab.name}
            </NavLink>
          ))}
        </Box>

        {/* User Section and Search */}
        <Box className="hidden md:flex items-center gap-6">
          {user?.fullname ? (
            <Link
              href={`/profile/${user.fullname}/favorites`}
              passHref
            >
              <Box className="flex items-center gap-3">
                <Avatar alt={user?.displayName} src={user?.avatar_url} />
                <Typography
                  variant="body1"
                  sx={{ color: themeData?.navText, fontWeight: "bold" }}
                >
                  {user?.fullname || user?.email}
                </Typography>
              </Box>
            </Link>
          ) : (
            <NavLink
              to="/"
              isActive={activeTab === "Login"}
              onClick={() => {
                setActiveTab("Login");
                handleLoginOpen();
              }}
              className="px-4 py-2 rounded-lg hover:bg-opacity-80"
              style={{
                background: themeData?.background?.button,
                color: themeData?.text?.button,
              }}
            >
              Login
            </NavLink>
          )}

          <IconButton
            onClick={handleSearchOpen}
            aria-label="Open Search"
            sx={{
              color: themeData?.icon?.main,
              border: `1px solid ${themeData?.text?.secondary}`,
              borderRadius: config?.borderRadius,
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Search Dialog */}
        <SearchDialog open={isDialogOpen} onClose={handleSearchClose} />
        {/* Login Dialog */}
        <LoginDialog open={isLoginDialogOpen} onClose={handleLoginClose} />
      </div>
    </Container>
  );
};

export default Navigation;
