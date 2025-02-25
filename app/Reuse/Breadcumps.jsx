import React from "react";
import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Breadcumps = ({ heading }) => {
  return (
    <div className="bg-gray-200 py-4 text-[#0f20404]">
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb" separator="|">
          <Link
            color="inherit"
            href="/"
            className=" mr-1 w-5 h-5 hover:text-red-500"
          >
            <HomeIcon fontSize="small" />
            Home
          </Link>
          {heading && (
            <Typography className="inline-block text-[#1a2e51] font-semibold capitalize">
              {heading}
            </Typography>
          )}
        </Breadcrumbs>
      </Container>
    </div>
  );
};

export default Breadcumps;
