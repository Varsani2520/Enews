import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { handleArticleClick } from "../hooks/ArticleClick";
import useArticleLike from "../hooks/ArticleLikes";

const Card4 = ({ imageUrl, category, title, alt, article }) => {
  const { isFavorite, toggleFavorite } = useArticleLike(article);

  return (
    <div
      className="flex items-center bg-white shadow-md rounded-md overflow-hidden mb-4 relative"
      onClick={() => handleArticleClick(article)}
    >
      {/* Left side image */}
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={alt}
          className="w-32 h-32 object-cover rounded-md"
        />
      </div>

      {/* Right side content */}
      <div className="p-4 flex-1">
        <div className="text-sm text-white bg-[#f20404] w-fit py-1 px-4 rounded-md font-bold">
          {category}
        </div>
        <h2 className="text-[#0f1f40] text-lg font-semibold">{title}</h2>
      </div>

      {/* Favorite Button (Top-Right) */}
      <button
        className="absolute top-2 right-2 text-white text-2xl"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleFavorite();
        }}
      >
        {isFavorite ? (
          <Favorite className="text-red-500" />
        ) : (
          <FavoriteBorder className="text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default Card4;
