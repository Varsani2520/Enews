"use client";

import React, { useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import Link from "next/link";
import { TechnologySkeleton } from "@/app/components/features/Skeleton";
import slugify from "slugify";
import { useNews } from "@/app/context/ArticleContext";
import Card5 from "../cards/Card5";
import NewsSlider from "../features/Slider";

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



  return (
    <Container maxWidth="xl" sx={{ marginBottom: "5%" }}>
   <NewsSlider slidesToShow={4}>   
   {articles.map((article, index) => (
          <Box key={index} px={1}>
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
      </NewsSlider>
    </Container>
  );
};

export default BreakingNews;
