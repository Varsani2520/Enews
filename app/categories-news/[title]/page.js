"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { getNews } from "@/app/utils/getNews";
import { useParams } from "next/navigation";
import Link from "next/link";
import slugify from "slugify";
import { TravelSkeleton } from "@/app/components/features/Skeleton";
import Card5 from "@/app/components/cards/Card5";
import Breadcumps from "@/app/components/shared/Breadcrumbs";

const CategoryPage = () => {
  const { title } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = title ? `Enews - ${title} News ` : "Enews - Latest News";

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
      <Breadcumps heading={title} />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {loading ? (
          <TravelSkeleton />
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
                    height="250px"
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
