"use client";
import React from "react";
import { Container, IconButton, Menu, MenuItem } from "@mui/material";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Icons from "../Reuse/Icons";

const Weather = () => {
  const getCurrentDate = () => {
    const options = {
      // weekday: "long",
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
    <div style={{ background: "#1a2e51", color: "white", padding: "10px 0" }}>
      {" "}
      <Container
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f20404",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            fontSize: "small",
            paddingRight: "2px",
          }}
        >
          <Icons icon={<DateRangeOutlinedIcon fontSize="small" />} />
          <span>{getCurrentDate()}</span>
        </div>

        {/* Right Side - Language Option Menu and Social Icons */}
        <div style={{ alignItems: "center" }} className="hidden sm:flex">
          {/* Language Option */}
          <IconButton
            color="inherit"
            onClick={handleLanguageClick}
            aria-label="Select Language"
          >
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
          <Icons
            icon={<FacebookIcon />}
            href="https://www.facebook.com"
            aria-label="Visit our Facebook page"
          />
          <Icons
            icon={<TwitterIcon />}
            href="https://x.com/RanjaniVar61457"
            aria-label="Visit our Twitter page"
          />
          <Icons
            icon={<LinkedInIcon />}
            href="https://www.linkedin.com/in/ranjani-varsani-45a875225/"
            aria-label="Visit our LinkedIn profile"
          />
          <Icons
            icon={<InstagramIcon />}
            href="https://www.instagram.com/varsaniranjani/"
            aria-label="Visit our Instagram page"
          />
        </div>
      </Container>
    </div>
  );
};

export default Weather;
