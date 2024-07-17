import React from 'react';
import { Breadcrumbs, Container, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Breadcumbs = ({ title, heading }) => {
  return (
    <div className="bg-gray-200 py-6">
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            <HomeIcon className="inline-block mr-1 w-5 h-5" />
            Home
          </Link>
          <Typography color="textPrimary" className="inline-block">{title}</Typography>
        </Breadcrumbs>
        {heading && (
          <Typography variant="h4" color="textPrimary" className="mt-4">
            {heading}
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default Breadcumbs;
