"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { getNews } from "@/app/utils/getNews";
import { useParams, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/utils/firebase";
import useArticleBookmark from "@/app/hooks/useArticleBookmark";
import slugify from "slugify";
import { getHandleArticleClick } from "@/app/hooks/useArticleClick";
import Breadcumps from "@/app/components/shared/Breadcrumbs";
import { NewsDetailSkeleton } from "@/app/components/features/Skeleton";
import NewsHeader from "@/app/components/news-detail/NewsHeader";
import NewsIcons from "@/app/components/news-detail/NewsIcons";
import RelatedNews from "@/app/components/news-detail/RelatedNews";
import CommentsDrawer from "@/app/components/news-detail/CommentDrawer";
import NewsContent from "@/app/components/news-detail/NewsContent";
import { useThemeContext } from "@/app/context/ThemeContext";
import InArticleAd from "@/app/components/features/ArticleAd";

const NewsDetailPage = () => {
  const [clickedArticle, setClickedArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { title } = useParams();
   const {themeData}=useThemeContext()
 
  const fetchArticle = async () => {
    try {
      const articles = await getHandleArticleClick();
      const foundArticle = articles.find(
        (art) => slugify(art.headline.main) === title
      );
      if (foundArticle) {
        setClickedArticle(foundArticle);
        const response = await getNews(foundArticle.category);
        setRelatedArticles(response.docs);
      } else {
        console.error("No article found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching clicked article:", error);
    }
  };
  useEffect(() => {
    document.title = title ? `Enews - ${title} News ` : "Enews - Latest News";

    fetchArticle();
  }, [title]);

  if (!clickedArticle) {
    return <NewsDetailSkeleton />;
  }

  return (
    <div className=" min-h-screen" style={{background:themeData.background}}>
      <Breadcumps heading={title} />
      <Container maxWidth="xl" sx={{ mt: "2%" }}>
        <Grid container spacing={3}>
          {/* Left Side - Display Big Image */}
          <Grid item xs={12} md={8}>
            <NewsHeader article={clickedArticle}/>
            <NewsIcons article={clickedArticle} title={title} />
            <InArticleAd/>

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
