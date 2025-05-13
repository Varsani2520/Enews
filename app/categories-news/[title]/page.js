"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import Link from "next/link";
import slugify from "slugify";
import { TravelSkeleton } from "@/app/components/features/Skeleton";
import Card5 from "@/app/components/cards/Card5";
import Breadcumps from "@/app/components/shared/Breadcrumbs";
import { useThemeContext } from "@/app/context/ThemeContext";
import { useArticleCollection } from "@/app/utils/useArticleCollection";

const CategoryPage = () => {
  const { title } = useParams();
  const { themeData } = useThemeContext()
  const { article, loading } = useArticleCollection(title)

  useEffect(() => {
    document.title = title ? `Enews - ${title} News ` : "Enews - Latest News";

  }, [title]);

  return (
    <div style={{ background: themeData?.background }}>
      <Breadcumps heading={title} />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {loading ? (
          <TravelSkeleton />
        ) : !article?.length? (
          <Typography variant="h6" align="center" color="error">
            No news articles found
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {article?.map((articleItem) => (
              <Grid item key={article?._id} xs={12} sm={6} md={3}>
                <Link href={`/news/${slugify(articleItem.slug)}`} passHref>
                  <Card5
                    category={articleItem.category.name}
                    title={articleItem.title}
                    imageUrl={articleItem.image_url}
                    article={articleItem}
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
