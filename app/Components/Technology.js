"use client";
import React, { useEffect, useState } from "react";
import { useNews } from "../context/ArticleContext";
import { Container, Grid, Button } from "@mui/material";
import Link from "next/link";
import slugify from "slugify";
import Card2 from "../Reuse/Card2";
import Card5 from "../Reuse/Card5";
import CardSkeleton from "./Skeleton";

const Technology = () => {
  const { newsData, fetchNews, loading } = useNews();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchNews("technology");
  }, []);

  const articles = newsData.technology;

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

  if (loading.technology || !newsData.technology) {
    return <CardSkeleton />;
  }

  return (
    <div
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/breaking-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <Container maxWidth="xl" sx={{ marginY: "5%" }} className="relative z-10">
        <Grid container spacing={3}>
          {/* Left Side - Big Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Link href={`/news/${slugify(articles[0].headline.main)}`}>
              <Card2
                height="400px"
                article={articles[0]}
                category={articles[0].section_name}
                title={articles[0].headline.main}
                imageUrl={`https://www.nytimes.com/${
                  articles[0].multimedia?.[0]?.url 
                }`}
              />
            </Link>
          </Grid>

          {/* Right Side - Three Smaller Cards */}
          <Grid item xs={12} sm={6} md={8}>
            <Grid container spacing={3}>
              {articles
                .slice(currentIndex, currentIndex + 3)
                .map((article, index) => (
                  <Grid item xs={12} md={4} sm={12} key={index} sx={{display:'flex',flexDirection:{sm:'column'}}}>
                    <Link
                      href={`/news/${slugify(article.headline.main, {
                        lower: true,
                      })}`}
                    >
                      <Card5
                        article={article}
                        category={article.section_name || "Technology"}
                        title={article.headline.main || "Untitled"}
                        imageUrl={`https://www.nytimes.com/${
                          article.multimedia?.[1]?.url 
                        }`}
                        height="250px"
                        className="transition-transform transform hover:scale-105 duration-300"

                      />
                    </Link>
                  </Grid>
                ))}
            </Grid>

            {/* Navigation Buttons */}
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Grid
                item
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <Button
                  onClick={handlePrev}
                  variant="contained"
                  sx={{
                    background: "#ef4444",
                    borderRadius: "8px",
                    px: 3,
                    py: 1,
                    boxShadow: "0px 4px 10px rgba(239, 68, 68, 0.3)",
                    "&:hover": { background: "#dc2626" },
                  }}
                >
                  ◀ Prev
                </Button>
              </Grid>
              <Grid
                item
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                <Button
                  onClick={handleNext}
                  variant="contained"
                  sx={{
                    background: "#ef4444",
                    borderRadius: "8px",
                    px: 3,
                    py: 1,
                    boxShadow: "0px 4px 10px rgba(239, 68, 68, 0.3)",
                    "&:hover": { background: "#dc2626" },
                  }}
                >
                  Next ▶
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Technology;
