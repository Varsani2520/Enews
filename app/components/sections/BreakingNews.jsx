"use client";

import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Link from "next/link";
import { TechnologySkeleton } from "@/app/components/features/Skeleton";
import slugify from "slugify";
import Card5 from "../cards/Card5";
import NewsSlider from "../features/Slider";
import { useHomes } from "@/app/utils/useHome";

const BreakingNews = () => {
  const { news, loading } = useHomes();


  if (loading || !news.breakingNews) {
    return <TechnologySkeleton />;
  }

  const articles = news.breakingNews;

  if (articles.length === 0) {
    return <h2>Article not found...</h2>;
  }



  return (
    <Container maxWidth="xl" sx={{ marginBottom: "5%" }}>
      <NewsSlider slidesToShow={4}>
        {articles.map((article, index) => (
          <Box key={index} px={1}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Link
                  href={`/news/${slugify(article?.slug)}`}
                >
                  <Card5
                    article={article}
                    category={article.category.name}
                    title={article.title}
                    imageUrl={article.image_url}
                    height="h-[250px] sm:h-[300px]"
                  />
                </Link>
              </Grid>
            </Grid>
          </Box>
        ))}
      </NewsSlider>
    </Container>
  );
};

export default BreakingNews;
