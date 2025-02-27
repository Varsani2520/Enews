import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import useArticleLike from "../hooks/ArticleLikes";
import { addHandleArticleClick } from "../hooks/ArticleClick";

const Card5 = ({ category, title, imageUrl, article }) => {
  const { isFavorite, toggleFavorite } = useArticleLike(article);

  return (
    <div className="relative overflow-hidden group">
      <div
        className="relative w-full aspect-[4/3]" // ✅ Ensures consistent height without cropping
        onClick={() => addHandleArticleClick(article)}
      >
        <img
          src={imageUrl || "/placeholder.jpg"}
          alt={title}
          className="w-full h-auto aspect-[4/3] rounded" // ✅ Fixes spacing issues
        />

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

        {/* Category Label */}
        <div className="absolute top-4 left-4 bg-[#f20404] text-white px-2 py-1 rounded-md">
          <p className="text-sm font-semibold">{category}</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-sm md:text-lg font-semibold mb-2 text-[#1a2e51] group-hover:text-red-600 transition-colors duration-300">
        {title}
      </h2>
    </div>
  );
};

export default Card5;
