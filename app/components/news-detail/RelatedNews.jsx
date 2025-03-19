import React from "react";
import Link from "next/link";
import slugify from "slugify";
import Card4 from "@/app/components/cards/Card4";

const RelatedNews = ({ articles }) => {
  return (
    <div>
      <div className="bg-red-700 text-white text-xs md:text-lg font-semibold px-3 py-1 rounded-lg mb-4">
        Related News
      </div>
      <div className="space-y-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Link href={`/news/${slugify(article.headline.main)}`} key={article._id}>
              <Card4
                article={article}
                category={article.section_name}
                title={article.headline.main}
                imageUrl={`https://www.nytimes.com/${article.multimedia?.[0]?.url}`}
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
