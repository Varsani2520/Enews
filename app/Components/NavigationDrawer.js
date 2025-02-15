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
import Icons from "../Reuse/Icons";

const NavigationDrawer = ({ activeTab, setActiveTab, handleSearchOpen }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <Box role="presentation" className="w-64 bg-white shadow-lg p-4">
      <List className="space-y-2">
        {/* Login & Search Button */}
        <ListItem className="flex justify-between items-center">
          <Button
            variant="contained"
            color="error"
            startIcon={<Avatar className="bg-white text-red-500"><PersonIcon /></Avatar>}
            className="w-full capitalize font-semibold"
          >
            Login
          </Button>
          <IconButton onClick={handleSearchOpen} className="ml-2">
            <Icons icon={<SearchIcon className="text-gray-700" />} />
          </IconButton>
        </ListItem>

        {/* Navigation Links */}
        {[
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about-us" },
          { name: "Contact", href: "/contact-us" },
          { name: "Breaking News", href: "/all_breaking_news" },
        ].map(({ name, href }) => (
          <ListItem key={name} className="px-2">
            <NavLink
              href={href}
              isActive={activeTab === name.toLowerCase()}
              onClick={() => setActiveTab(name.toLowerCase())}
              className={`text-gray-900 font-semibold text-lg hover:text-red-500 transition-all ${
                activeTab === name.toLowerCase() ? "border-l-4 border-red-500 pl-2" : "pl-4"
              }`}
            >
              {name}
            </NavLink>
          </ListItem>
        ))}

        {/* Categories with Dropdown */}
        <ListItem button onClick={() => setCategoriesOpen(!categoriesOpen)} className="px-2">
          <Typography
            variant="body1"
            className={`font-semibold text-lg text-gray-900 hover:text-red-500 transition-all ${
              activeTab === "categories" ? "border-l-4 border-red-500 pl-2" : "pl-4"
            }`}
          >
            Categories
          </Typography>
          {categoriesOpen ? <ExpandLess className="text-gray-700" /> : <ExpandMore className="text-gray-700" />}
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
                  onClick={() => setActiveTab(category.toLowerCase())}
                  className={`text-gray-800 font-semibold text-base hover:text-red-500 transition-all ${
                    activeTab === category.toLowerCase() ? "border-b-2 border-red-500 pb-1" : ""
                  }`}
                >
                  {category}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default NavigationDrawer;
