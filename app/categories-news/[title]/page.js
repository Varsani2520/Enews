"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { getNews } from "@/app/utils/getNews";
import Card5 from "@/app/Reuse/Card5";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcumbs from "@/app/Reuse/Breadcumps";
import slugify from "slugify";

const CategoryPage = () => {
  const { title } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (title) {
          const response = await getNews(title);
          setArticles(response.docs);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [title]);

  return (
    <div>
      <Breadcumbs heading={title} />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {loading ? (
          <Typography variant="h6" align="center">
            Loading articles...
          </Typography>
        ) : articles.length === 0 ? (
          <Typography variant="h6" align="center" color="error">
            No news articles found
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {articles.map((article) => (
              <Grid item key={article._id} xs={12} sm={6} md={3}>
                <Link href={`/news/${slugify(article.headline.main)}`} passHref>
                  <Card5
                    category={article.section_name}
                    title={article.headline.main}
                    imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`}
                    article={article}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default CategoryPage;
