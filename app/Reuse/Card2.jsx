import React from "react";
import useArticleLike from "../hooks/ArticleLikes";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { addHandleArticleClick } from "../hooks/ArticleClick";

const Card2 = ({ category, title, imageUrl, height, width, article }) => {
  const { isFavorite, toggleFavorite } = useArticleLike(article);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg mb-4 group cursor-pointer"
      style={{ height: height || "300px", width: width || "100%" }}
      onClick={() => addHandleArticleClick(article)}
    >
      {/* Background Image */}
      <img className="object-fill w-full h-full" src={imageUrl} alt={title} />
      {/* Like Button */}
      <button
        className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all ${
          isFavorite
            ? "bg-red-500 text-white"
            : "bg-gray-800 bg-opacity-50 text-white"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleFavorite();
        }}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </button>
      {/* Category and Title */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
        <div className="bg-red-700 text-white text-xs md:text-sm lg:text-lg font-semibold px-2 py-1 rounded-md inline-block">
          {category}
        </div>
        <div className="text-sm md:text-lg  font-bold text-white mt-2 group-hover:text-red-600">
          {title}
        </div>
      </div>
    </div>
  );
};

export default Card2;
