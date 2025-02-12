import React from "react";
import { Container, Button, Typography } from "@mui/material";

const Banner = ({ title, buttonText }) => {
  return (
    <Container maxWidth="xl" className="my-4">
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg mb-4">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="w-16 h-auto" />
          <Typography variant="h5" className="font-bold">
            {title || "Stay informed, stay ahead with our daily news"}
          </Typography>
        </div>

        {/* Right side - Read More button */}
        <Button
          variant="contained"
          color="secondary"
          className="ml-4 shadow-md"
        >
          {buttonText || "Read More"}
        </Button>
      </div>
    </Container>
  );
};

export default Banner;
