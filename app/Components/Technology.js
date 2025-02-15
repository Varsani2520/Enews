"use client";
import React, { useEffect, useState } from "react";
import { getNews } from "../utils/getNews";
import Card2 from "../Reuse/Card2";
import { Container, Grid, Button } from "@mui/material";
import Link from "next/link";
import CardSkeleton from "./Skeleton";
import Card5 from "../Reuse/Card5";
import slugify from "slugify";
const Technology = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getNews("technology");
        setArticles(response.docs);
        console.log("technology", response);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

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

  if (articles.length === 0) {
    return <CardSkeleton />;
  }

  return (
    <div
      className="relative bg-cover bg-no-repeat bg-center "
      style={{ backgroundImage: "url('/breaking-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>{" "}
      {/* Subtle overlay */}
      <Container maxWidth="xl" sx={{ marginY: "5%" }} className="relative z-10">
        <Grid container spacing={3}>
          {/* Left Side - Big Card */}
          <Grid item xs={12} sm={6} md={4}>
            {" "}
            <Link href={`/news/${slugify(articles[0].headline.main)}`}>
              <Card2
                height="400px"
                article={articles[0]}
                category={articles[0].section_name}
                title={articles[0].headline.main}
                imageUrl={`https://www.nytimes.com/${
                  articles[0].multimedia?.[0]?.url || "/placeholder.jpg"
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
                  <Grid item xs={12} md={4} sm={6} key={index}>
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
                          article.multimedia?.[1]?.url || "/placeholder.jpg"
                        }`}
                        height="250px"
                      />
                    </Link>
                  </Grid>
                ))}
            </Grid>
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
                  sx={{ background: "#ef4444" }}
                >
                  Prev
                </Button>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Button
                  onClick={handleNext}
                  variant="contained"
                  sx={{ background: "#ef4444" }}
                >
                  Next
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
