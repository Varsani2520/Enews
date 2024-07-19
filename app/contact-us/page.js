'use client'
import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';
import { collection, addDoc } from 'firebase/firestore';
import Breadcumps from '../Reuse/Breadcumps';
import { db } from '../utils/firebase';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'contacts'), formData);
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast.error('Error sending message!');
    }
  };

  return (
    <div className="bg-gray-200">
      <Toaster />
      <Breadcumps title="Contact" />

      <Container maxWidth="xl" className="py-8">
        <Grid container spacing={4}>
          {/* Left side - Contact Details */}
          <Grid item xs={12} md={4} className="bg-white p-6 rounded-lg shadow-md">
            <Typography variant="h6" gutterBottom>
              Office Address
            </Typography>
            <Typography variant="body1" gutterBottom>
              123 Street, City, Country
            </Typography>

            <Typography variant="h6" className="mt-4" gutterBottom>
              Phone Number
            </Typography>
            <Typography variant="body1" gutterBottom>
              +123 456 7890
            </Typography>
          </Grid>

          {/* Right side - How Can We Help You */}
          <Grid item xs={12} md={8} className="bg-white p-6 rounded-lg shadow-md">
            <Typography variant="h4" gutterBottom>
              How Can We Help You?
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in velit eget ante
              tristique consectetur.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} className="mt-4">
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                type="email"
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-4"
              >
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactPage;
