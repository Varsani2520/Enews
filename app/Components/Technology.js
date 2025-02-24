"use client";

import React, { useEffect } from "react";
import { Container, Grid, Box } from "@mui/material";
import Card2 from "../Reuse/Card2";
import Link from "next/link";
import CardSkeleton from "./Skeleton";
import slugify from "slugify";
import { useNews } from "../context/ArticleContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Technology = () => {
  const { newsData, fetchNews, loading } = useNews();

  useEffect(() => {
    fetchNews("technology");
  }, []);

  if (loading.technology || !newsData.technology) {
    return <CardSkeleton />;
  }

  const articles = newsData.technology;

  if (articles.length === 0) {
    return <CardSkeleton />;
  }

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 3 articles per row
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth="xl">
        <Slider {...settings}>
          {articles.map((article, index) => (
            <Box key={index} px={1}> {/* Adds spacing between cards */}
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <Link
                    href={`/news/${slugify(article?.headline?.main, {
                      lower: true,
                    })}`}
                  >
                    <Card2
                      article={article}
                      category={article?.section_name}
                      title={article?.headline?.main}
                      imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`}
                      height="400px"
                      width="100%"
                    />
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Slider>
    </Container>
  );
};

export default Technology;
