'use client'
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { getNews } from "@/app/utils/getNews";
import Card5 from "@/app/Reuse/Card5";
import { useParams } from "next/navigation";
import Link from "next/link";
import Breadcumbs from "@/app/Reuse/Breadcumps";

const CategoryPage = () => {
  const { title } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (title) {
          const response = await getNews(title);
          setArticles(response.docs);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [title]);

  return (
    <div>
      <Breadcumbs title={"Category"} heading={title} />
      <Container maxWidth="xl" sx={{ py: "5%" }}>
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid item key={article._id} xs={12} md={4}>
              <Link
                href={`/news/${encodeURIComponent(article.headline.main)}`}
                passHref
              >
                <Card5
                  category={article.section_name}
                  title={article.headline.main}
                  imageUrl={`https://www.nytimes.com/${
                    article.multimedia?.[0]?.url || "/placeholder.jpg"
                  }`}
                  date={article.pub_date}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default CategoryPage;
