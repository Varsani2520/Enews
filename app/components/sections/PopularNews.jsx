"use client";

import React from "react";

import Link from "next/link";
import { Container } from "@mui/material";
import { PopularSkeleton } from "../features/Skeleton";
import Card1 from "../cards/Card1";
import { useHomeContext, } from "@/app/utils/useHome";
const PopularCards = () => {
  const { homeData: news, loading } = useHomeContext();
  const popular = news?.popularNews;


  if (loading || !popular) {
    return <PopularSkeleton />;
  }

  const articles = popular;

  return (
    <Container maxWidth="xl">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Left Side Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1">
          {articles.slice(0, 2).map((article, index) => (
            <Link key={index} href={`/news/${article.slug}`}>
              <Card1
                article={article}
                category={article.category.name}
                title={article.title}
                imageUrl={article.image_url}
                height="h-[191px] sm:h-[300px]"
              />
            </Link>
          ))}
        </div>

        {/* Center Big Card */}
        <div className="col-span-1 sm:col-span-2">
          <Link href={`/news/${articles[2].slug}`}>
            <div className="flex flex-col min-h-[191px]">
              <Card1
                article={articles[2]}
                category={articles[2].category.name}
                title={articles[2].title}
                imageUrl={articles[2].image_url}
                height="h-[400px] sm:h-[300px]"
              />
            </div>
          </Link>
        </div>

        {/* Right Side Cards */}
        <div className="grid grid-cols-1">
          {articles.slice(3, 5).map((article, index) => (
            <Link key={index} href={`/news/${article.slug}`}>
              <Card1
                article={article}
                category={article.category.name}
                title={article.title}
                imageUrl={article.image_url}
                height="h-[191px] sm:h-[300px]"
              />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularCards;
