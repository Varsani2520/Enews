"use client";
import React from "react";
import { Container, Grid } from "@mui/material";
import Link from "next/link";
import slugify from "slugify";
import { RecentSkeleton } from "../features/Skeleton";
import Card2 from "../cards/Card2";
import Card1 from "../cards/Card1";
import { useHomeContext } from "@/app/utils/useHome";


const RecentNews = () => {
  const { homeData: news, loading } = useHomeContext();


  if (loading || !news.recentNews) {
    return <RecentSkeleton />;
  }

  const articles = news.recentNews;

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {/* First Column - Left Side Large Card */}
        <Grid item sm={9} xs={12}>
          <Link href={`/news/${slugify(articles[0]?.slug)}`}>
            <Card2
              article={articles[0]}
              category={articles[0].category.name}
              title={articles[0].title}
              imageUrl={articles[0].image_url}
              height="h-[520px] sm:h-[300px]"
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
          {articles.slice(1, 4).map((article) => (
            <Link
              key={article?._id}
              href={`/news/${slugify(article.slug)}`}
            >
              <Card1
                article={article}
                category={article.category.name}
                title={article.title}
                imageUrl={article.image_url}
                height="h-[210px] sm:h-[300px]"
              />
            </Link>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecentNews;
