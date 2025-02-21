"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import Card2 from "../Reuse/Card2";
import Card3 from "../Reuse/Card3";
import Link from "next/link";
import slugify from "slugify";
import { useNews } from "../context/ArticleContext";
import CardSkeleton from "./Skeleton";

const BreakingNews = () => {
  const { newsData, fetchNews, loading } = useNews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const category = "breaking";

  useEffect(() => {
    fetchNews(category);
  }, [fetchNews]);

  const articles = newsData[category] || [];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading || articles.length === 0) {
    return <CardSkeleton />;
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* Left Side - Big Card */}
        <Grid item xs={12} md={3}>
          <Link href={`/news/${slugify(articles[0]?.headline?.main || "news")}`}>
            <Card2
              article={articles[0]}
              category={articles[0]?.section_name}
              title={articles[0]?.headline?.main}
              imageUrl={`https://www.nytimes.com/${articles[0]?.multimedia?.[0]?.url || "/placeholder.jpg"}`}
              height="fit-content"
            />
          </Link>
        </Grid>

        {/* Right Side - Three Smaller Cards */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {articles.slice(1).map((article, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Link href={`/news/${slugify(article.headline.main)}`}>
                  <Card3
                    article={article}
                    category={article.section_name}
                    title={article.headline.main}
                    imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url || "/placeholder.jpg"}`}
                    width="100%"
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BreakingNews;
