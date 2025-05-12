import React from "react";
import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useThemeContext } from "@/app/context/ThemeContext";

const Breadcumps = ({ heading }) => {
  const {themeData}=useThemeContext()
  return (
    <div
    className="py-4"
    style={{
      backgroundColor: themeData?.headerBg, // Background color from theme
      color: "#1a2e51", 
    }}
  >      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb" separator="|" style={{color:themeData?.cardText}}>
          <Link
            color="inherit"
            href="/"
            className="mr-1 w-5 h-5 hover:text-red-500">
            <HomeIcon fontSize="small" />
            Home
          </Link>
          {heading && (
            <Typography className="inline-block font-semibold capitalize">
              {heading}
            </Typography>
          )}
        </Breadcrumbs>
      </Container>
    </div>
  );
};

export default Breadcumps;
