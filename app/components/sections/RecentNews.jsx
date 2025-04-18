"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import Link from "next/link";
import slugify from "slugify";
import { useNews } from "@/app/context/ArticleContext";
import { RecentSkeleton } from "../features/Skeleton";
import Card2 from "../cards/Card2";
import Card1 from "../cards/Card1";


const RecentNews = () => {
  const { newsData, fetchNews, loading } = useNews();

  useEffect(() => {
    fetchNews("recent");
  }, []);

  if (loading.recent || !newsData.recent) {
    return <RecentSkeleton />;
  }

  const articles = newsData.recent;

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {/* First Column - Left Side Large Card */}
        <Grid item sm={9} xs={12}>
          <Link href={`/news/${slugify(articles[0]?.headline?.main)}`}>
            <Card2
              article={articles[0]}
              category={articles[0].section_name}
              title={articles[0].headline.main}
              imageUrl={`https://www.nytimes.com/${articles[0].multimedia?.[0]?.url}`}
              height="h-[500px] sm:h-[300px]"
              />
          </Link>
        </Grid>

        {/* Second Column - Right Side Small Cards */}
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {articles.slice(1, 3).map((article) => (
            <Link
              key={article._id}
              href={`/news/${slugify(article.headline.main)}`}
            >
              <Card1
                article={article}
                category={article.section_name}
                title={article.headline.main}
                imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`}
                height="h-[240px] sm:h-[300px]"
              />
            </Link>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecentNews;
