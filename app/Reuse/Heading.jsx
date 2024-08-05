import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

const Heading = ({ title, subtitle, buttonText }) => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ color: '#1a2e51', fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#515d75', fontWeight: 'bold' }}>
            {subtitle}
          </Typography>
        </Box>
        {/* <Button
          variant="contained"
          sx={{
            background: '#f20404',
            fontWeight: 'bold',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkred',
            },
          }}
        >
          {buttonText}
        </Button> */}
      </Box>
    </Container>
  );
};

export default Heading;
