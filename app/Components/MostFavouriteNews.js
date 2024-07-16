"use client";
import React, { useEffect, useState } from "react";
import { getNews } from "../utils/getNews";
import Card1 from "../Reuse/Card1";
import Card2 from "../Reuse/Card2";
import { Container, Grid } from "@mui/material";

const MostFavouriteNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getNews("favourite");
        setArticles(response.docs);
        setLoading(false);
        console.log("favourite", response);
      } catch (error) {
        console.error("Error fetching favourite articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (articles.length === 0) {
    return <div>No favourite articles found.</div>;
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* First Column - Left Side Large Card */}
        <Grid item xs={12} md={8}>
          <Card2
            height={"613px"}
            category={articles[0].section_name}
            title={articles[0].headline.main}
            imageUrl={`https://www.nytimes.com/${
              articles[0].multimedia?.[0]?.url || "/placeholder.jpg"
            }`}
          />
        </Grid>

        {/* Second Column - Right Side Small Cards */}
        <Grid item xs={12} md={4}>
          {articles.length > 1 && (
            <>
              <Card1
                category={articles[1].section_name}
                title={articles[1].headline.main}
                imageUrl={`https://www.nytimes.com/${
                  articles[1].multimedia?.[0]?.url || "/placeholder.jpg"
                }`}
                height="300px"
                width="100%"
                marginBottom={"5%"}
              />
              {articles.length > 2 && (
                <Card1
                  category={articles[2].section_name}
                  title={articles[2].headline.main}
                  imageUrl={`https://www.nytimes.com/${
                    articles[2].multimedia?.[0]?.url || "/placeholder.jpg"
                  }`}
                  height="300px"
                  width="100%"
                />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MostFavouriteNews;
