import React from "react";

const NewsHeader = ({ article }) => {
  return (
    <div className="mb-4">
      <div className="bg-red-700 text-white text-xs md:text-lg font-semibold px-3 py-1 rounded-lg w-fit">
        {article.section_name}
      </div>
      <h1 className="text-2xl sm:text-sm font-bold mt-1 text-[#1a2e51]">
        {article.headline.main}
      </h1>
      <p className="text-gray-500 mt-1">
        {article.byline?.original} • {new Date(article.pub_date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NewsHeader;
