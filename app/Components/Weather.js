"use client";
import React from "react";
import { Container, IconButton, Menu, MenuItem } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Icons from "../Reuse/Icons";

const Weather = () => {
  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString(undefined, options);
  };

  const [languageAnchor, setLanguageAnchor] = React.useState(null);

  const handleLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  return (
    <div style={{ background: '#1a2e51', color: 'white', padding: '10px 0' }}>      <Container
        maxWidth="xl"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "25px",
          paddingBottom: "25px",
        }}
      >
        {/* Left Side - Current Date and Calendar Icon */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <CalendarTodayIcon />
          </IconButton>
          <span style={{ marginLeft: "5px" }}>{getCurrentDate()}</span>
        </div>

        {/* Right Side - Language Option Menu and Social Icons */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Language Option */}
          <IconButton color="inherit" onClick={handleLanguageClick}>
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={handleLanguageClose}
          >
            <MenuItem onClick={handleLanguageClose}>English</MenuItem>
            <MenuItem onClick={handleLanguageClose}>French</MenuItem>
            <MenuItem onClick={handleLanguageClose}>Spanish</MenuItem>
          </Menu>

          {/* Social Media Icons */}
          <Icons icon={<FacebookIcon />} href="https://www.facebook.com" />
          <Icons icon={<TwitterIcon />} href="https://x.com/RanjaniVar61457" />
          <Icons
            icon={<LinkedInIcon />}
            href="https://www.linkedin.com/in/ranjani-varsani-45a875225/"
          />
          <Icons
            icon={<InstagramIcon />}
            href="https://www.instagram.com/varsaniranjani/"
          />
        </div>
      </Container>
    </div>
  );
};

export default Weather;
