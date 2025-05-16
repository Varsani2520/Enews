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

import Link from "next/link";
import NavLink from "./NavLink";
import LoginDialog from "@/app/Models/Login";

import { logoutUser } from "@/app/utils/auth";
import { useAuth } from "@/app/context/AuthContext";

const NavigationDrawer = ({
  activeTab,
  setActiveTab,
  handleSearchOpen,
  handleDrawerClose,
}) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);



  const { user } = useAuth();
  return (
    <Box role="presentation" className="w-64 bg-white p-5 rounded-lg">
      <List className="space-y-4">
        {/* Login & Search Button */}
        <ListItem className="flex justify-between items-center">
          {user ? (
            <Link
              href={`/profile/${user?.displayName}/favorites`}
              passHref
            >
              <Typography className="font-semibold text-lg">
                {user.displayName}
              </Typography>
            </Link>
          ) : (
            <Button
              onClick={() => setIsLoginDialogOpen(true)}
              variant="contained"
              color="error"
              className="w-full capitalize font-semibold text-lg py-2 mr-2 rounded-lg transition-all hover:bg-red-600"
            >
              Login
            </Button>
          )}
          <IconButton
            onClick={handleSearchOpen}
            aria-label="Open Search"
            sx={{ color: "red", border: "1px solid #ccc", borderRadius: "5px" }}
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
              className={`block w-full text-gray-900 font-semibold text-lg py-2 px-4 rounded-lg transition-all hover:text-red-500 hover:bg-gray-100 ${activeTab === name.toLowerCase()
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
            className={`w-full text-gray-900 font-semibold text-lg py-2 px-4 rounded-lg transition-all flex justify-between items-center ${activeTab === "categories"
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
                  className={`block text-gray-800 font-semibold text-base py-2 px-4 rounded-lg transition-all hover:text-red-500 hover:bg-gray-100 ${activeTab === category.toLowerCase()
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
        {user ? (
          <button
            onClick={logoutUser}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium shadow transition-all"
          >
            Logout
          </button>
        ) : (
          <></>
        )}
      </List>
      <LoginDialog
        open={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
      />
    </Box>
  );
};

export default NavigationDrawer;
