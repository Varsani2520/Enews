"use client";
import React, { useEffect, useState } from "react";
import { getNews } from "../utils/getNews";
import Card1 from "../Reuse/Card1";
import Card2 from "../Reuse/Card2";
import { Container, Grid } from "@mui/material";
import Link from "next/link";
import CardSkeleton from "./Skeleton";

const RecentNews = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await getNews("recent");
      setArticles(response.docs);
      console.log("recent", response);
    } catch (error) {
      console.error("Error fetching recent articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (articles.length === 0) {
    return <CardSkeleton />;
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* First Column - Left Side Large Card */}
        <Grid item xs={12} md={8}>
          <Link href={`/news/${encodeURIComponent(articles[0].headline.main)}`}>
            <Card2
              height={"613px"}
              category={articles[0].section_name}
              title={articles[0].headline.main}
              imageUrl={`https://www.nytimes.com/${
                articles[0].multimedia?.[0]?.url || "/placeholder.jpg"
              }`}
              abstract={articles[0].abstract}
              snippet={articles[0].snippet}
            />
          </Link>
        </Grid>

        {/* Second Column - Right Side Small Cards */}
        <Grid item xs={12} md={4}>
          {articles.slice(1, 3).map((article, index) => (
            <Link
              key={article._id}
              href={`/news/${encodeURIComponent(article.headline.main)}`}
            >
              <Card1
                category={article.section_name}
                title={article.headline.main}
                imageUrl={`https://www.nytimes.com/${
                  article.multimedia?.[0]?.url || "/placeholder.jpg"
                }`}
                height="300px"
                width="100%"
                marginBottom={index === 0 ? "5%" : undefined}
              />
            </Link>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecentNews;
