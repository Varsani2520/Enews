import React from "react";
import Link from "next/link";
import slugify from "slugify";
import Card4 from "@/app/components/cards/Card4";
import { useThemeContext } from "@/app/context/ThemeContext";

const RelatedNews = ({ articles }) => {
  const {themeData}=useThemeContext()
  return (
    <div>
      <div className="text-xs md:text-lg font-semibold px-3 py-1 rounded-lg mb-4" style={{
          backgroundColor: themeData?.buttonBg,
          color: themeData?.buttonText, 
        }}>
        Related News
      </div>
      <div className="space-y-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Link href={`/news/${slugify(article.slug)}`} key={article?._id}>
              <Card4
                article={article}
                category={article.category?.name}
                title={article.title}
                imageUrl={article.image_url}
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center">No related articles found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedNews;
