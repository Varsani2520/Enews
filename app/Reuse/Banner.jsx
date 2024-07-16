import React from 'react';
import { Container, Button, Typography } from '@mui/material';

const Banner = ({ logo, title, buttonText }) => {
  return (
    <Container maxWidth="lg" className="my-10">
      <div className={`flex items-center justify-between bg-opacity-50 bg-[#030c14] text-white p-4 rounded-lg mb-4`}>
        {/* Left side - Logo */}
        <div className="mr-1">
          <img src='/logo.png' alt="Logo" className="w-40 h-auto" />
        </div>

        {/* Center - Title */}
        <div className="text-center flex-1">
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
        </div>

        {/* Right side - Buy Now button */}
        <Button variant="contained" color="primary" className="ml-4">
          {buttonText}
        </Button>
      </div>
    </Container>
  );
};

export default Banner;
