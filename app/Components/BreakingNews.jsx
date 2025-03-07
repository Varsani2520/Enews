"use client";

import React, { useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import Link from "next/link";
import { TechnologySkeleton } from "./Skeleton";
import slugify from "slugify";
import { useNews } from "../context/ArticleContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card5 from "../Reuse/Card5";

const BreakingNews = () => {
  const { newsData, fetchNews, loading } = useNews();

  useEffect(() => {
    fetchNews("breaking");
  }, []);

  if (loading.breaking || !newsData.breaking) {
    return <TechnologySkeleton />;
  }

  const articles = newsData.breaking;

  if (articles.length === 0) {
    return <h2>Article not found...</h2>;
  }

  // Slick slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <Container maxWidth="xl" sx={{ marginBottom: "5%" }}>
      <Slider {...settings}>
        {articles.map((article, index) => (
          <Box key={index}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Link
                  href={`/news/${slugify(article?.headline?.main, {
                    lower: true
                  })}`}
                >
                  <Card5
                    article={article}
                    category={article?.section_name}
                    title={article?.headline?.main}
                    imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`}
                    height="h-[250px] sm:h-[300px]"
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

export default BreakingNews;
