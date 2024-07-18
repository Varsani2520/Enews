import React from 'react';
import { Container, Button, Typography } from '@mui/material';

const Banner = ({ logo, title, buttonText }) => {
  return (
    <Container maxWidth="lg" className="my-8">
      <div className={`flex items-center justify-between  bg-black text-white p-4 rounded-lg mb-4`}>
        {/* Left side - Logo */}
        <div className="mr-1">
          <img src='/logo.png' alt="Logo" className="w-20 h-auto" />
        </div>

        {/* Center - Title */}
        <div className="text-center flex-1 ">
          <Typography variant="body2" component="h2">
            {title ? title : "Stay informed,stay ahead with our daily news"}
          </Typography>
        </div>

        {/* Right side - Buy Now button */}
        <Button variant="outlined"  className="ml-4 text-white border-white">
          {buttonText ? buttonText : "Buy Now"}
        </Button>
      </div>
    </Container>
  );
};

export default Banner;
