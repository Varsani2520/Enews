import React from "react";
import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Breadcumps = ({ heading }) => {
  return (
    <div className="bg-gray-200 py-4 text-[#0f20404]">
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb" separator="|">
          <Link color="inherit" href="/">
            <HomeIcon className="inline-block mr-1 w-5 h-5 " />
            Home
          </Link>
          {heading && <Typography className="inline-block">{heading}</Typography>}
        </Breadcrumbs>
      </Container>
    </div>
  );
};

export default Breadcumps;
