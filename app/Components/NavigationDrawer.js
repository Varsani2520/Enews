import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
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
} from "@mui/icons-material";
import NavLink from "../Reuse/NavLink";
import Icons from "../Reuse/Icons";

const NavigationDrawer = ({ activeTab, setActiveTab, handleSearchOpen }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleCategoriesClick = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  return (
    <Box role="presentation" style={{ width: 250 }}>
      <List>
        {/* Login Button with Avatar and Red Background */}
        <ListItem>
          <Button
            variant="contained"
            color="error"
            startIcon={<Avatar size="small" />}
            fullWidth
            style={{ textTransform: "none" }}
          >
            Login
          </Button>
          <ListItem button onClick={handleSearchOpen}>
            <Icons icon={<SearchIcon />} />
          </ListItem>
        </ListItem>


        {/* Navigation Links */}
        <ListItem>
          <NavLink
            href="/"
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
            className={`text-black font-bold text-lg ${
              activeTab === "home" ? "border-l-2 border-red-500" : ""
            }`}
          >
            Home
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            href="/about-us"
            isActive={activeTab === "about"}
            onClick={() => setActiveTab("about")}
            className={`text-black font-bold text-lg ${
              activeTab === "about" ? "border-l-2 border-red-500" : ""
            }`}
          >
            About Us
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            href="/contact-us"
            isActive={activeTab === "contact"}
            onClick={() => setActiveTab("contact")}
            className={`text-black font-bold text-lg ${
              activeTab === "contact" ? "border-l-2 border-red-500" : ""
            }`}
          >
            Contact
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            href="/all_breaking_news"
            isActive={activeTab === "breaking"}
            onClick={() => setActiveTab("breaking")}
            className={`text-black font-bold text-lg ${
              activeTab === "breaking" ? "border-l-2 border-red-500" : ""
            }`}
          >
            Breaking News
          </NavLink>
        </ListItem>

        {/* Categories with Dropdown */}
        <ListItem button onClick={handleCategoriesClick}>
          <ListItemText
            primary="Categories"
            className={`text-black font-bold text-lg ${
              activeTab === "categories" ? "border-l-2 border-red-500" : ""
            }`}
          />
          {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <NavLink
                href="/categories-news/technology"
                isActive={activeTab === "technology"}
                onClick={() => setActiveTab("technology")}
                className={`text-black font-bold text-xl ${
                  activeTab === "technology" ? "border-b-2 border-red-500" : ""
                }`}
              >
                Technology
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                href="/categories-news/science"
                isActive={activeTab === "science"}
                onClick={() => setActiveTab("science")}
                className={`text-black font-bold text-xl ${
                  activeTab === "science" ? "border-b-2 border-red-500" : ""
                }`}
              >
                Science
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                href="/categories-news/religion"
                isActive={activeTab === "religion"}
                onClick={() => setActiveTab("religion")}
                className={`text-black font-bold text-xl ${
                  activeTab === "religion" ? "border-b-2 border-red-500" : ""
                }`}
              >
                Religion
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                href="/categories-news/politics"
                isActive={activeTab === "politics"}
                onClick={() => setActiveTab("politics")}
                className={`text-black font-bold text-xl ${
                  activeTab === "politics" ? "border-b-2 border-red-500" : ""
                }`}
              >
                Politics
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                href="/categories-news/business"
                isActive={activeTab === "business"}
                onClick={() => setActiveTab("business")}
                className={`text-black font-bold text-xl ${
                  activeTab === "business" ? "border-b-2 border-red-500" : ""
                }`}
              >
                Business
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                href="/categories-news/family"
                isActive={activeTab === "family"}
                onClick={() => setActiveTab("family")}
                className={`text-black font-bold text-xl ${
                  activeTab === "family" ? "border-b-2 border-red-500" : ""
                }`}
              >
                Family
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                href="/categories-news/car"
                isActive={activeTab === "car"}
                onClick={() => setActiveTab("car")}
                className={`text-black font-bold text-xl ${
                  activeTab === "car" ? "border-b-2 border-red-500" : ""
                }`}
              >
                Car
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                href="/categories-news/travels"
                isActive={activeTab === "travels"}
                onClick={() => setActiveTab("travels")}
                className={`text-black font-bold text-xl ${
                  activeTab === "travels" ? "border-b-2 border-red-500" : ""
                }`}
              >
                Travels
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                href="/categories-news/sports"
                isActive={activeTab === "sports"}
                onClick={() => setActiveTab("sports")}
                className={`text-black font-bold text-xl ${
                  activeTab === "sports" ? "border-b-2 border-red-500" : ""
                }`}
              >
                Sports
              </NavLink>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default NavigationDrawer;
