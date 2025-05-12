import { useThemeContext } from "@/app/context/ThemeContext";
import React from "react";

const NewsHeader = ({ article }) => {
  const { themeData } = useThemeContext()
  return (
    <div className="mb-4">
      <div className=" text-xs md:text-lg font-semibold px-3 py-1 rounded-lg w-fit" style={{
        backgroundColor: themeData?.buttonBg,
        color: themeData?.buttonText,
      }}>
        {article.category?.name}
      </div>
      <h1 className="text-sm sm:text-lg font-bold mt-1" style={{ color: themeData?.cardText }}>
        {article.title}
      </h1>
      <p className=" mt-1" style={{ color: themeData?.cardText }}>
        By {article.createdBy?.fullname} • {new Date(article.published_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NewsHeader;
