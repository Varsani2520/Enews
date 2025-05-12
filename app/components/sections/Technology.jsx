"use client";

import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import Link from "next/link";
import slugify from "slugify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TechnologySkeleton } from "../features/Skeleton";
import Card2 from "../cards/Card2";
import NewsSlider from "../features/Slider";
import { useHomes } from "@/app/utils/useHome";

const Technology = () => {
  const { news, loading } = useHomes()


  if (loading || !news.technology) {
    return <TechnologySkeleton />;
  }

  const articles = news.technology;

  if (articles.length === 0) {
    return <h2>article not found</h2>;
  }



  return (
    <Container maxWidth="xl">
      <NewsSlider slidesToShow={4}>
        {articles.map((article, index) => (
          <Box key={index} px={1}> {/* ✅ Added spacing */}

            {/* Add spacing between cards */}
            <Link
              href={`/news/${slugify(article?.slug)}`}
            >
              <Card2
                height="300px"
                article={article}
                category={article.category.name}
                title={article.title}
                imageUrl={article.image_url}
              />
            </Link>
          </Box>
        ))}
      </NewsSlider>

    </Container>
  );
};

export default Technology;
