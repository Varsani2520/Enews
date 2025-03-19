"use client";

import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import Link from "next/link";
import slugify from "slugify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNews } from "@/app/context/ArticleContext";
import { TechnologySkeleton } from "../features/Skeleton";
import Card2 from "../cards/Card2";
import NewsSlider from "../features/Slider";

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

  

  return (
    <Container maxWidth="xl">
   <NewsSlider slidesToShow={4}>   
         {articles.map((article, index) => (
                      <Box key={index} px={1}> {/* ✅ Added spacing */}

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
              </NewsSlider>

    </Container>
  );
};

export default Technology;
