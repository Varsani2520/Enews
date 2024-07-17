import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Breadcumbs from '../Reuse/Breadcumps';

const ContactPage = () => {
  return (
    <div className="bg-gray-200">
      <Breadcumbs title="Contact" />

      <Container maxWidth="xl" className="py-8">
        <Grid container spacing={1}>
          {/* Left side - Contact Details */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" gutterBottom>
              Office Address
            </Typography>
            <Typography variant="body1" gutterBottom>
              123 Street, City, Country
            </Typography>

            <Typography variant="h4" className="mt-4" gutterBottom>
              Phone Number
            </Typography>
            <Typography variant="body1" gutterBottom>
              +123 456 7890
            </Typography>
          </Grid>

          {/* Right side - How Can We Help You */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              How Can We Help You?
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in velit eget ante
              tristique consectetur.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactPage;
