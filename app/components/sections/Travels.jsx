"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Link from "next/link";
import slugify from "slugify";
import { useNews } from "@/app/context/ArticleContext";
import { TravelSkeleton } from "../features/Skeleton";
import Card1 from "../cards/Card1";

const Travels = () => {
  const { newsData, fetchNews, loading } = useNews();

  useEffect(() => {
    fetchNews("travel");
  }, []);

  if (loading.travel || !newsData.travel) {
    return <TravelSkeleton />;
  }

  const articles = newsData.travel;
  console.log("travel", articles);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {articles.slice(0, 4).map((article, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link
              key={article._id}
              href={`/news/${slugify(article.headline.main)}`}
            >
              <Card1
                article={article}
                category={article.section_name}
                title={article.headline.main}
                imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`}
                marginBottom="20px"
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Travels;
