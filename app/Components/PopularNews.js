"use client";

import React, { useEffect } from "react";
import { useNews } from "../context/ArticleContext";
import Card1 from "../Reuse/Card1";
import Link from "next/link";
import slugify from "slugify";
import { Container, Grid } from "@mui/material";
import { popularSkeleton } from "./Skeleton";
const PopularCards = () => {
  const { newsData, fetchNews, loading } = useNews();

  useEffect(() => {
    fetchNews("popular");
  }, []);

  if (loading.popular || !newsData.popular) {
    return <popularSkeleton />;
  }

  const articles = newsData.popular;

  return (
    <Container maxWidth="xl">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Left Side Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1">
          {articles.slice(0, 2).map((article, index) => (
            <Link key={index} href={`/news/${slugify(article.headline.main)}`}>
              <Card1
                article={article}
                category={article.section_name}
                title={article.headline.main}
                imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`}
                height="191px"
              />
            </Link>
          ))}
        </div>

        {/* Center Big Card */}
        <div className="col-span-1 sm:col-span-2">
          <Link href={`/news/${slugify(articles[2].headline.main)}`}>
            <Card1
              article={articles[2]}
              category={articles[2].section_name}
              title={articles[2].headline.main}
              imageUrl={`https://www.nytimes.com/${articles[2].multimedia?.[0]?.url}`}
              height="400px"
            />
          </Link>
        </div>

        {/* Right Side Cards */}
        <div className="grid grid-cols-1">
          {articles.slice(3, 5).map((article, index) => (
            <Link key={index} href={`/news/${slugify(article.headline.main)}`}>
              <Card1
                article={article}
                category={article.section_name}
                title={article.headline.main}
                imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`}
                height="191px"
              />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularCards;
