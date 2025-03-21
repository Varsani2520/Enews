"use client";
import { useThemeContext } from "@/app/context/ThemeContext";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const Heading = ({ title, subtitle, buttonText, link }) => {
  const {themeData}=useThemeContext()
  const handleClick = () => {
    if (link) {
      window.location.href = link;
    }
  };
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 0",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{ color: themeData.cardText, fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: themeData.secondary }}>
            {subtitle}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          sx={{
            fontWeight: "bold",
            color: themeData.cardText,
            borderColor: themeData.secondary, 
          }}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </Box>
    </Container>
  );
};

export default Heading;
