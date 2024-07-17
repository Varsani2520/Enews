import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

const Heading = ({ title, subtitle, buttonText }) => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold', marginBottom: '8px' }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'gray' }}>
            {subtitle}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            background: 'red',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkred',
            },
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Container>
  );
};

export default Heading;
