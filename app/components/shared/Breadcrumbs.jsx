import React from "react";
import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useThemeContext } from "@/app/context/ThemeContext";

const Breadcumps = ({ heading }) => {
  const { themeData } = useThemeContext()
  return (
    <div
      className="py-4"
      style={{
        backgroundColor: themeData?.background?.header, // Background color from theme
        color: themeData?.text?.primary
      }}
    >      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb" separator="|" sx={{ color: themeData?.text?.primary }}>
          <Link
            href="/"
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              color: themeData?.text?.primary,
            }}
          >
            <HomeIcon fontSize="small" />
            Home
          </Link>
          {heading && (
            <Typography
              sx={{
                fontWeight: 600,
                textTransform: "capitalize",
                color: themeData?.text?.primary,
              }}>
              {heading}
            </Typography>
          )}
        </Breadcrumbs>
      </Container>
    </div>
  );
};

export default Breadcumps;
