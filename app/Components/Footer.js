'use client'
import React, { useState } from "react";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      await addDoc(collection(db, "sunscriptions"), {
        email,
        subscribeAt: new Date(),
      });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      console.error("Error subscribing: ", error);
    }
  };
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
        </div>

        {/* Second Section: Navigation Links */}
        <div>
          <Typography variant="h6" className="text-lg font-bold mb-4">
            Navigations
          </Typography>
          <Divider />
          <ul className="text-sm">
            <li className="mb-2">
              <Link href="/">Home</Link>
            </li>
            <li className="mb-2">
              <Link href="/news/live-news">Live News</Link>
            </li>
            <li className="mb-2">
              <Link href="/news/breaking-news">Breaking News</Link>
            </li>
            <li className="mb-2">
              <Link href="/about-us">About Us</Link>
            </li>
            <li className="mb-2">
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Third Section: Categories */}
        <div>
          <Typography variant="h6" className="text-lg font-bold mb-4">
            Categories
          </Typography>
          <Divider />
          <ul className="text-sm">
            <li className="mb-1">
              <Link href="/news/technology">Technology</Link>
            </li>
            <li className="mb-1">
              <Link href="/news/science">Science</Link>
            </li>
            <li className="mb-1">
              <Link href="/news/religion">Religion</Link>
            </li>
            <li className="mb-1">
              <Link href="/news/politics">Politics</Link>
            </li>
            <li className="mb-1">
              <Link href="/news/business">Business</Link>
            </li>
            <li className="mb-1">
              <Link href="/news/family">Family</Link>
            </li>
            <li className="mb-1">
              <Link href="/news/top-news">Top News</Link>
            </li>
            <li className="mb-1">
              <Link href="/news/cars">Cars</Link>
            </li>
            <li className="mb-1">
              <Link href="/news/travels">Travels</Link>
            </li>
            <li className="mb-1">
              <Link href="/news/sports">Sports</Link>
            </li>
            <li className="mb-1">
              <Link href="/categories-news/health">Health</Link>
            </li>
          </ul>
        </div>

        {/* Fourth Section: Email Subscription */}
        <div>
          <Typography variant="h6" className="text-lg font-bold mb-4">
            Subscribe to our Newsletter
          </Typography>
          <Typography variant="body2" className="text-sm mb-4">
            Get the latest updates right in your inbox.
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            className="bg-white rounded-md mb-2"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
