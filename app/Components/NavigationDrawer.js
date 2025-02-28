"use client";
import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  IconButton,
  Avatar,
  Button,
  Collapse,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
} from "@mui/icons-material";
import NavLink from "../Reuse/NavLink";
import Login from "../Models/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Link from "next/link";
import slugify from "slugify";

const NavigationDrawer = ({
  activeTab,
  setActiveTab,
  handleSearchOpen,
  handleDrawerClose,
}) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleLoginOpen = () => setIsLoginDialogOpen(true);
  const [user] = useAuthState(auth);
  return (
    <Box role="presentation" className="w-64 bg-white p-5 rounded-lg">
      <List className="space-y-4">
        {/* Login & Search Button */}
        <ListItem className="flex justify-between items-center">
          {user ? (
            <Link href={`/profile/${slugify(user?.displayName)}/favorites`} passHref>
              <div className="flex items-center space-x-3">
                <Avatar
                  src={user.photoURL || ""}
                  alt={user.displayName || "User"}
                />
                <Typography className="font-semibold text-lg">
                  {user.displayName || "User"}
                </Typography>
              </div>
            </Link>
          ) : (
            <Button
              onClick={() => setIsLoginDialogOpen(true)}
              variant="contained"
              color="error"
              startIcon={
                <Avatar className="bg-white text-red-500 shadow-md">
                  <PersonIcon />
                </Avatar>
              }
              className="w-full capitalize font-semibold text-lg py-2 rounded-lg transition-all hover:bg-red-600"
            >
              Login
            </Button>
          )}
          <IconButton
            onClick={handleSearchOpen}
            aria-label="Open Search"
            className="ml-2 border border-gray-300 rounded-lg p-2 transition-all hover:bg-gray-200"
          >
            <SearchIcon className="text-red-500" />
          </IconButton>
        </ListItem>

        {/* Navigation Links */}
        {[
          { name: "Home", href: "/" },
          { name: "Breaking News", href: "/categories-news/breaking" },
          { name: "Live News", href: "/categories-news/live" },
          { name: "Entertainment", href: "/categories-news/Entertainment" },
        ].map(({ name, href }) => (
          <ListItem key={name} className="px-2">
            <NavLink
              href={href}
              isActive={activeTab === name.toLowerCase()}
              onClick={() => {
                setActiveTab(name.toLowerCase());
                handleDrawerClose(); // Close drawer on click
              }}
              className={`block w-full text-gray-900 font-semibold text-lg py-2 px-4 rounded-lg transition-all hover:text-red-500 hover:bg-gray-100 ${
                activeTab === name.toLowerCase()
                  ? "bg-red-100 text-red-500"
                  : ""
              }`}
            >
              {name}
            </NavLink>
          </ListItem>
        ))}

        {/* Categories with Dropdown */}
        <ListItem
          onClick={() => setCategoriesOpen(!categoriesOpen)}
          className="px-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all flex items-center"
        >
          <NavLink
            href="#"
            isActive={activeTab === "categories"}
            onClick={() => setActiveTab("categories")}
            className={`w-full text-gray-900 font-semibold text-lg py-2 px-4 rounded-lg transition-all flex justify-between items-center ${
              activeTab === "categories"
                ? "bg-red-100 text-red-500"
                : "hover:text-red-500"
            }`}
          >
            Categories
            {categoriesOpen ? (
              <ExpandLess className="text-gray-700" />
            ) : (
              <ExpandMore className="text-gray-700" />
            )}
          </NavLink>
        </ListItem>

        <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
          <List component="div" className="ml-4 space-y-2">
            {[
              "Technology",
              "Science",
              "Religion",
              "Politics",
              "Business",
              "Family",
              "Car",
              "Travels",
              "Sports",
            ].map((category) => (
              <ListItem key={category} className="px-2">
                <NavLink
                  href={`/categories-news/${category.toLowerCase()}`}
                  isActive={activeTab === category.toLowerCase()}
                  onClick={() => {
                    setActiveTab(category.toLowerCase());
                    handleDrawerClose(); // Close drawer on click
                  }}
                  className={`block text-gray-800 font-semibold text-base py-2 px-4 rounded-lg transition-all hover:text-red-500 hover:bg-gray-100 ${
                    activeTab === category.toLowerCase()
                      ? "border-l-4 border-red-500 pl-3 text-red-500 bg-red-100"
                      : ""
                  }`}
                >
                  {category}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
      <Login
        open={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
      />
    </Box>
  );
};

export default NavigationDrawer;
