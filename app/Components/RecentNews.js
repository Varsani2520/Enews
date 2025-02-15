"use client";
import React, { useEffect, useState } from "react";
import { getNews } from "../utils/getNews";
import Card1 from "../Reuse/Card1";
import Card2 from "../Reuse/Card2";
import { Container, Grid } from "@mui/material";
import Link from "next/link";
import CardSkeleton from "./Skeleton";
import slugify from "slugify";

const RecentNews = () => {
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getNews("recent");
        if (response?.docs?.length) {
          setArticles(response.docs);
        } else {
          setArticles([]); // Ensure it's an array
        }
      } catch (error) {
        console.error("Error fetching recent articles:", error);
        setArticles([]); // Handle error case
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);
  if (loading) {
    return <CardSkeleton />;
  }

  // Ensure articles array has enough items before rendering
  if (articles.length < 3) {
    return <p>No recent news available.</p>;
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* First Column - Left Side Large Card */}
        <Grid item xs={12} md={8}>
        <Link href={`/news/${slugify(articles[0]?.headline?.main || "news")}`}>
        <Card2
              article={articles[0]}
              height={"613px"}
              category={articles[0].section_name}
              title={articles[0].headline.main}
              imageUrl={`https://www.nytimes.com/${
                articles[0].multimedia?.[0]?.url || "/placeholder.jpg"
              }`}
            />
          </Link>
        </Grid>

        {/* Second Column - Right Side Small Cards */}
        <Grid item xs={12} sm={12} md={4} display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          {articles.slice(1, 3).map((article, index) => (
            <Link
              key={article._id}
              href={`/news/${slugify(article.headline.main)}`}
            >
              <Card1
                article={article}
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
