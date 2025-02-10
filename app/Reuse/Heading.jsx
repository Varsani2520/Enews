'use client'
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const Heading = ({ title, subtitle, buttonText ,link}) => {
  const handleClick=()=>{
    if(link){
      window.location.href=link;
    }
  }
  return (
    <Container maxWidth="xl" className="mt-5">
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
            sx={{ color: "#1a2e51", fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#515d75" }}>
            {subtitle}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          sx={{
            fontWeight: "bold",
            color: "#1a2e51",
            
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
