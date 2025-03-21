import { useThemeContext } from "@/app/context/ThemeContext";
import React from "react";

const NewsHeader = ({ article }) => {
  const {themeData}=useThemeContext()
  return (
    <div className="mb-4">
      <div className=" text-xs md:text-lg font-semibold px-3 py-1 rounded-lg w-fit"  style={{
          backgroundColor: themeData.buttonBg,
          color: themeData.buttonText, 
        }}>
        {article.section_name}
      </div>
      <h1 className="text-2xl sm:text-sm font-bold mt-1" style={{color:themeData.cardText}}>
        {article.headline.main}
      </h1>
      <p className=" mt-1" style={{color:themeData.cardText}}>
        {article.byline?.original} • {new Date(article.pub_date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NewsHeader;
