"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Link from "next/link";
import { TravelSkeleton } from "../features/Skeleton";
import Card1 from "../cards/Card1";
import { useHomeContext } from "@/app/utils/useHome";

const Travels = () => {
const { homeData: news, loading } = useHomeContext();


  if (loading || !news.travelNews) {
    return <TravelSkeleton />;
  }

  const articles = news.travelNews;
  console.log("travel", articles);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {articles.slice(0, 4).map((article, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link
              key={article?._id}
              href={`/news/${article.slug}`}
            >
              <Card1
                article={article}
                category={article.category.name}
                title={article.title}
                imageUrl={article.image_url}
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
