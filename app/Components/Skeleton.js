"use client";

import React from "react";
import { Card, CardContent, CardMedia, Typography, Skeleton, Container, Box, Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const CardSkeleton = ({ height = "191px" }) => {
  return (
    <Card sx={{ width: "100%", height }}>
      <CardMedia>
        <Skeleton variant="rectangular" width="100%" height={height} />
      </CardMedia>
      <CardContent>
        <Typography variant="body2">
          <Skeleton variant="text" width="80%" />
        </Typography>
        <Typography variant="body2">
          <Skeleton variant="text" width="60%" />
        </Typography>
      </CardContent>
    </Card>
  );
};

export const PopularSkeleton = () => {
  return (
    <Container maxWidth="xl">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="grid grid-cols-1">
          <CardSkeleton height="191px" />
          <CardSkeleton height="191px" />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <CardSkeleton height="400px" />
        </div>

        <div className="grid grid-cols-1">
          <CardSkeleton height="191px" />
          <CardSkeleton height="191px" />
        </div>
      </div>
    </Container>
  );
};

export const RecentNewsSkeleton = () => {
  return (
    <Container maxWidth="xl">
      <CardSkeleton height="500px" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <CardSkeleton height="240px" />
        <CardSkeleton height="240px" />
      </div>
    </Container>
  );
};

// Technology Section Skeleton with Slider
export const TechnologySkeleton = () => {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ marginBottom: "2%" }}>
      <Slider {...settings}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Box key={index} px={1}>
            <Skeleton variant="rectangular" width="100%" height="300px" />
            <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" />
          </Box>
        ))}
      </Slider>
    </Container>
  );
};



export const TravelSkeleton = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CardSkeleton height="250px" />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};



export const NewsDetailSkeleton = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Container maxWidth="xl" sx={{ mt: "2%" }}>
        <Grid container spacing={3}>
          {/* Left Side - Main Article Skeleton */}
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="50%" height={20} />
            <div className="flex justify-between items-center my-4">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
            </div>
            <Skeleton variant="rectangular" width="100%" height={400} />
            <Skeleton variant="text" width="100%" height={100} />
            <Skeleton variant="text" width="90%" height={60} />
          </Grid>
          {/* Right Side - Related Articles Skeleton */}
          <Grid item xs={12} md={4}>
            <Skeleton variant="text" width={150} height={30} />
            {[...Array(3)].map((_, index) => (
              <div key={index} className="my-4">
                <Skeleton variant="rectangular" width="100%" height={120} />
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="text" width="60%" height={20} />
              </div>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

