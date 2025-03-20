"use client";
import React, { useState } from "react";
import { Container } from "@mui/material";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import Icons from "../shared/Icons";
import ThemeButton from "../features/ThemeButton";
import { useThemeContext } from "@/app/context/ThemeContext";

const Weather = () => {
const {themeData,setTheme}=useThemeContext()

  const getCurrentDate = () => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ background: themeData.primary,
      color: themeData.background, padding: "10px 0" }}>
      {" "}
      <Container
        maxWidth="xl"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Side - Current Date and Calendar Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: themeData.accent,
            color: themeData.background,
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
            fontWeight: "bold",
            borderRadius: "10px",
            fontSize: "small",
            paddingRight: "6px",
          }}
        >
          <Icons icon={<DateRangeOutlinedIcon fontSize="small" />} />
          <span>{getCurrentDate()}</span>
        </div>

        {/* Right Side - Social Icons */}
        <div style={{ alignItems: "center" }} className="hidden sm:flex">
          {/* Social Media Icons */}
          <ThemeButton onThemeChange={setTheme} />
          <Icons
            icon={<GitHubIcon />}
            href="https://github.com/varsani2520/"
            aria-label="Visit our Facebook page"
          />
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
