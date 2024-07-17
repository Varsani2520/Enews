"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
import { getNews } from "@/app/utils/getNews";
import Card4 from "@/app/Reuse/Card4";
import Breadcumbs from "@/app/Reuse/Breadcumps";
import { useParams } from "next/navigation";

const NewsDetailPage = () => {
  const [clickedArticle, setClickedArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    const storedArticle = JSON.parse(localStorage.getItem("clickedArticle"));
    if (storedArticle) {
      setClickedArticle(storedArticle);
      fetchRelatedArticles(storedArticle.category);
    }
  }, []);

  const fetchRelatedArticles = async (category) => {
    try {
      const response = await getNews(category);
      setRelatedArticles(response.docs);
    } catch (error) {
      console.error("Error fetching related articles:", error);
    }
  };

  if (!clickedArticle) {
    return <div>Loading...</div>; // Handle initial load or no stored data
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <Breadcumbs heading={decodeURIComponent(title)} title={"News Articles"} />
      <Container maxWidth="xl" sx={{ mt: "5%" }}>
        <Grid container spacing={3}>
          {/* Left Side - Display Big Image */}
          <Grid item xs={12} md={8}>
            <div className="mb-4">
              <p className="text-gray-600">{clickedArticle.category}</p>
              <h1 className="text-3xl font-bold mt-1">{clickedArticle.title}</h1>
            </div>
            <img
              src={clickedArticle.imageUrl}
              alt="Article"
              className="w-full h-auto rounded-lg shadow-lg mb-6"
            />
          </Grid>
          {/* Right Side - Display Related Articles */}
          <Grid item xs={12} md={4}>
            <h2 className="text-2xl font-bold mb-4 bg-red-700 text-center text-white p-[2%] rounded-lg">
              Related News
            </h2>
            <div className="space-y-4">
              {relatedArticles.map((article) => (
                <Card4
                  key={article._id}
                  category={article.section_name}
                  title={article.headline.main}
                  imageUrl={`https://www.nytimes.com/${
                    article.multimedia?.[0]?.url || "/placeholder.jpg"
                  }`}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NewsDetailPage;
