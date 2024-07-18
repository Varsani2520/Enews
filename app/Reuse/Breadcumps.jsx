import React from 'react';
import { Breadcrumbs, Container, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Breadcumps = ({ title, heading }) => {
  return (
    <div className="bg-gray-200 py-4 text-[#0f20404]">
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb" separator="|">
          <Link color="inherit" href="/">
            <HomeIcon className="inline-block mr-1 w-5 h-5 " />
            Home
          </Link>
          <Typography className="inline-block">{title}</Typography>
        </Breadcrumbs>
        {heading && (
          <Typography variant="h6" className="mt-4">
            {heading}
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default Breadcumps;
