import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* First Section: Logo and Description */}
        <div>
          <img src="/logo.png" alt="Logo" className="h-12 mb-4" />
          <Typography variant="body2" className="text-sm">
            News Web Website is an online platform that provides news and
            information about various topics, including current events,
            entertainment, politics, sports, technology, and more.
          </Typography>
          <Typography variant="body2" className="text-sm mt-4">
            Follow Us:
          </Typography>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white">
              <FacebookIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <InstagramIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <LinkedInIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <TwitterIcon />
            </a>
          </div>
        </div>

        {/* Second Section: Navigation Links */}
        <div>
          <Typography variant="h6" className="text-lg font-bold mb-4">
            Navigations
          </Typography>
          <Divider />
          <ul className="text-sm">
            <li className="mb-2">
              <a href="#">Home</a>
            </li>
            <li className="mb-2">
              <a href="#">Live News</a>
            </li>
            <li className="mb-2">
              <a href="#">Breaking News</a>
            </li>
            <li className="mb-2">
              <a href="#">About Us</a>
            </li>
            <li className="mb-2">
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Third Section: Categories */}
        <div>
          <Typography variant="h6" className="text-lg font-bold mb-4">
            Categories
          </Typography>{" "}
          <Divider />
          <ul className="text-sm">
            <li className="mb-1">
              <a href="#">Technology</a>
            </li>
            <li className="mb-1">
              <a href="#">Science</a>
            </li>
            <li className="mb-1">
              <a href="#">Religion</a>
            </li>
            <li className="mb-1">
              <a href="#">Politics</a>
            </li>
            <li className="mb-1">
              <a href="#">Business</a>
            </li>
            <li className="mb-1">
              <a href="#">Family</a>
            </li>
            <li className="mb-1">
              <a href="#">Top News</a>
            </li>
            <li className="mb-1">
              <a href="#">Cars</a>
            </li>
            <li className="mb-1">
              <a href="#">Travels</a>
            </li>
            <li className="mb-1">
              <a href="#">Sports</a>
            </li>
            <li className="mb-1">
              <a href="#">Health</a>
            </li>
          </ul>
        </div>

        {/* Fourth Section: Download App */}
        <div>
          <Typography variant="h6" className="text-lg font-bold mb-4">
            Download App
          </Typography>
          <Typography variant="body2" className="text-sm mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <a href="#" className="text-blue-400 hover:text-blue-200">
            Download Now
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
