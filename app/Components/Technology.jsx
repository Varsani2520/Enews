"use client";

import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import Card2 from "../Reuse/Card2";
import Link from "next/link";
import { TechnologySkeleton } from "./Skeleton";
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
    return <TechnologySkeleton />;
  }

  const articles = newsData.technology;

  if (articles.length === 0) {
    return <h2>article not found</h2>;
  }

  // Slick slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 articles per row
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200, // Large screen
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Mobile
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
          <Box key={index}>
            {" "}
            {/* Add spacing between cards */}
            <Link
              href={`/news/${slugify(article?.headline?.main, {
                lower: true,
              })}`}
            >
              <Card2
                height="300px"
                article={article}
                category={article?.section_name}
                title={article?.headline?.main}
                imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`}
              />
            </Link>
          </Box>
        ))}
      </Slider>
    </Container>
  );
};

export default Technology;
