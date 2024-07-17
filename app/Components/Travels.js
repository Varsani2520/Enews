"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { getNews } from "../utils/getNews";
import Card1 from "../Reuse/Card1";
import { Container } from "@mui/material";
import Link from "next/link";

const Travels = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await getNews("travel");
      setArticles(response.docs);
      console.log("travel", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        {articles.slice(0, 4).map((article, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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
                height="100%"
                width="100%"
                marginBottom="20px"
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Travels;
