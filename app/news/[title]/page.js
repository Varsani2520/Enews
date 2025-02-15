"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { getNews } from "@/app/utils/getNews";
import Card4 from "@/app/Reuse/Card4";
import Breadcumbs from "@/app/Reuse/Breadcumps";
import { useParams } from "next/navigation";
import CardSkeleton from "@/app/Components/Skeleton";
import Link from "next/link";

const NewsDetailPage = () => {
  const [clickedArticle, setClickedArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    const storedArticle = localStorage.getItem("clickedArticle");
    if (storedArticle) {
      const parsedArticle = JSON.parse(storedArticle);
      setClickedArticle(parsedArticle);
      fetchRelatedArticles(parsedArticle.category);
    } else {
      console.error("No article found in localStorage.");
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
    return <CardSkeleton />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Breadcumbs heading={decodeURIComponent(title)} />
      <Container maxWidth="xl" sx={{ mt: "2%" }}>
        <Grid container spacing={3}>
          {/* Left Side - Display Big Image */}
          <Grid item xs={12} md={8}>
            <div className="mb-4">
              <p className="text-white bg-red-700 px-2 w-fit rounded-md">
                {clickedArticle.section_name}
              </p>
              <h1 className="text-3xl font-bold mt-1 text-[#1a2e51]">
                {clickedArticle.headline_main}
              </h1>
              <p className="text-gray-500 mt-1">
                {clickedArticle.byline?.original} •{" "}
                {new Date(clickedArticle.pub_date).toLocaleDateString()}
              </p>
            </div>
            <img
              src={`https://www.nytimes.com/${clickedArticle.multimedia?.[0]?.url}`}
              alt={clickedArticle.headline_main}
              className="w-full h-auto rounded-lg shadow-lg mb-6"
            />
            {/* Lead Paragraph */}
            {clickedArticle.lead_paragraph && (
              <p className="text-gray-700 leading-7 mb-4">
                {clickedArticle.lead_paragraph}
              </p>
            )}
            {/* Abstract */}
            {clickedArticle.abstract && (
              <p className="text-gray-500 italic mb-4">
                {clickedArticle.abstract}
              </p>
            )}
            {/* Keywords */}
            {clickedArticle.keywords && clickedArticle.keywords.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Keywords:</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {clickedArticle.keywords.map((keyword, index) => (
                    <li key={index}>{keyword.value}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Full Article Link */}
            <div className="mt-4 text-blue-500">
              <a
                href={clickedArticle.web_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Read the full article on The New York Times
              </a>
            </div>{" "}
          </Grid>
          {/* Right Side - Display Related Articles */}
          <Grid item xs={12} md={4}>
            <h2 className="text-2xl  mb-4 bg-red-700 text-center text-white px-2 rounded-lg">
              Related News
            </h2>
            <div className="space-y-4">
              {relatedArticles.map((article) => (
                <Link href={`/news/${article.headline.main}`} key={article._id}>
                  {" "}
                  <Card4
                    article={article}
                    category={article.section_name}
                    title={article.headline.main}
                    alt={article.headline.main}
                    imageUrl={`https://www.nytimes.com/${
                      article.multimedia?.[0]?.url || "/placeholder.jpg"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default NewsDetailPage;
