"use client";

import React, { useEffect } from "react";
import { useNews } from "../context/ArticleContext";
import Card1 from "../Reuse/Card1";
import { Container, Grid } from "@mui/material";
import Link from "next/link";
import CardSkeleton from "./Skeleton";
import slugify from "slugify";

const PopularCards = () => {
  const { newsData, fetchNews, loading } = useNews();

  useEffect(() => {
    fetchNews("popular");
  }, []);

  if (loading.popular || !newsData.popular) {
    return <CardSkeleton />;
  }

  const articles = newsData.popular;

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* First Column - Left Side Cards */}
        <Grid item xs={12} sm={6} md={3}>
          {articles.slice(0, 2).map((article, index) => (
            <Link key={index} href={`/news/${slugify(article.headline.main)}`}>
              <Card1
                article={article}
                marginBottom={"5%"}
                category={article.section_name}
                title={article.headline.main}
                imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url || "/placeholder.jpg"}`}
                height="300px"
                width="100%"
              />
            </Link>
          ))}
        </Grid>

        {/* Second Column - Center Big Card */}
        <Grid item xs={12} sm={6} md={6}>
          <Link href={`/news/${slugify(articles[2].headline.main)}`}>
            <Card1
              article={articles[2]}
              category={articles[2].section_name}
              title={articles[2].headline.main}
              imageUrl={`https://www.nytimes.com/${articles[2].multimedia?.[0]?.url || "/placeholder.jpg"}`}
              height="613px"
              width="100%"
            />
          </Link>
        </Grid>

        {/* Third Column - Right Side Cards */}
        <Grid item xs={12} sm={6} md={3} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", md: "column" }, gap: { sm: '2%' } }}>
          {articles.slice(3, 5).map((article, index) => (
            <Link key={index} href={`/news/${slugify(article.headline.main)}`}>
              <Card1
                article={article}
                category={article.section_name}
                title={article.headline.main}
                imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url || "/placeholder.jpg"}`}
                height="300px"
                width="100%"
              />
            </Link>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PopularCards;
