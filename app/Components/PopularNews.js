"use client";
import React, { useEffect, useState } from "react";
import { getNews } from "../utils/getNews";
import Card1 from "../Reuse/Card1";
import { Container, Grid } from "@mui/material";

const PopularCards = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getNews("popular");
        setArticles(response.docs);
        console.log("popular", response);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  if (articles.length === 0) {
    return <div>Loading...</div>; // You can show a loading indicator while fetching data
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* First Column - Left Side Cards */}
        <Grid item xs={12} md={3}>
          <Card1
            marginBottom={"5%"}
            category={articles[0].section_name}
            title={articles[0].headline.main}
            imageUrl={`https://www.nytimes.com/${
              articles[0].multimedia?.[0]?.url || "/placeholder.jpg"
            }`}
            height="300px"
            width="100%"
          />
          <Card1
            category={articles[1].section_name}
            title={articles[1].headline.main}
            imageUrl={`https://www.nytimes.com/${
              articles[1].multimedia?.[0]?.url || "/placeholder.jpg"
            }`}
            height="300px"
            width="100%"
          />
        </Grid>

        {/* Second Column - Center Big Card */}
        <Grid item xs={12} md={6}>
          <Card1
            category={articles[2].section_name}
            title={articles[2].headline.main}
            imageUrl={`https://www.nytimes.com/${
              articles[2].multimedia?.[0]?.url || "/placeholder.jpg"
            }`}
            height="613px"
            width="100%"
          />
        </Grid>

        {/* Third Column - Right Side Cards */}
        <Grid item xs={12} md={3}>
          <Card1
            marginBottom={"5%"}
            category={articles[3].section_name}
            title={articles[3].headline.main}
            imageUrl={`https://www.nytimes.com/${
              articles[3].multimedia?.[0]?.url || "/placeholder.jpg"
            }`}
            height="300px"
            width="100%"
          />
          <Card1
            category={articles[4].section_name}
            title={articles[4].headline.main}
            imageUrl={`https://www.nytimes.com/${
              articles[4].multimedia?.[0]?.url || "/placeholder.jpg"
            }`}
            height="300px"
            width="100%"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PopularCards;
