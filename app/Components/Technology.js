'use client'
import React, { useEffect, useState } from "react";
import { getNews } from "../utils/getNews";
import Card1 from "../Reuse/Card1";
import Card2 from "../Reuse/Card2";
import { Container, Grid, Button } from "@mui/material";

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
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* Left Side - Big Card */}
        <Grid item xs={12} md={3}>
          <Card2
            category={articles[0].section_name}
            title={articles[0].headline.main}
            imageUrl={`https://www.nytimes.com/${
              articles[0].multimedia?.[0]?.url || "/placeholder.jpg"
            }`}
            height="400px"
          />
        </Grid>

        {/* Right Side - Three Smaller Cards */}
        <Grid item xs={12} md={9}>
          <Grid
            container
            spacing={3}
            style={{ display: "flex", flexDirection: "row", height: "100%" }}
          >
            {articles
              .slice(currentIndex, currentIndex + 3)
              .map((article, index) => (
                <Grid item xs={12} md={4} key={index} style={{ height: "100%" }}>
                  <Card1
                    category={article.section_name}
                    title={article.headline.main}
                    imageUrl={`https://www.nytimes.com/${
                      article.multimedia?.[0]?.url || "/placeholder.jpg"
                    }`}
                    height="100%" // Adjust to 100% to fill the container height
                    width="100%"
                  />
                </Grid>
              ))}
          </Grid>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "20px" }}
          >
            <Grid item>
              <Button
                onClick={handlePrev}
                variant="contained"
                sx={{ background: "#ef4444" }}
              >
                Prev
              </Button>
            </Grid>
            <Grid item>
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
  );
};

export default Technology;
