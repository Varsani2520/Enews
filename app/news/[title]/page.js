"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Breadcumps from "@/app/components/shared/Breadcrumbs";
import { NewsDetailSkeleton } from "@/app/components/features/Skeleton";
import NewsHeader from "@/app/components/news-detail/NewsHeader";
import NewsIcons from "@/app/components/news-detail/NewsIcons";
import RelatedNews from "@/app/components/news-detail/RelatedNews";
import CommentsDrawer from "@/app/components/news-detail/CommentDrawer";
import NewsContent from "@/app/components/news-detail/NewsContent";
import GoogleAd from "@/app/components/features/GoogleAd";
import { useSingleArticles } from "@/app/utils/useSingleArticle";

const NewsDetailPage = () => {
  const { title } = useParams();
  const { article: clickedArticle, loading, relatedArticles } = useSingleArticles(title);

  useEffect(() => {
    document.title = title ? `Enews - ${title} News ` : "Enews - Latest News";
  }, [title]);


  if (loading || !clickedArticle) {
    return <NewsDetailSkeleton />;
  }

  return (
    <div className=" min-h-screen" >
      <Breadcumps heading={title} />
      <Container maxWidth="xl" sx={{ my: "2%" }}>
        <Grid container spacing={3}>
          {/* Left Side - Display Big Image */}
          <Grid item xs={12} md={8}>
            <NewsHeader article={clickedArticle} />
            <NewsIcons article={clickedArticle} title={title} />
            <NewsContent article={clickedArticle} />
          </Grid>
          {/* Right Side - Display Related Articles */}
          <Grid item xs={12} md={4}>
            <RelatedNews articles={relatedArticles} />
          </Grid>
        </Grid>
      </Container>

      {/* Comments Drawer */}
      <CommentsDrawer article={clickedArticle} />

    </div>
  );
};

export default NewsDetailPage;
