import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import useArticleLike from "../hooks/ArticleLikes";
import { addHandleArticleClick } from "../hooks/ArticleClick";

const Card5 = ({ category, title, imageUrl, height, article }) => {
  const { isFavorite, toggleFavorite } = useArticleLike(article);

  return (
    <div className="relative  overflow-hidden">
      <div
        className="relative"
        style={{ height }}
        onClick={() => addHandleArticleClick(article)}
      >
        <img
          src={imageUrl}
          alt="Article Image"
          className="w-full h-full object-cover object-center rounded "
        />
        {/* Like Button */}
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
            <FavoriteBorder className="text-white" />
          )}
        </button>
        <div className="absolute top-4 left-4 bg-[#f20404] text-white px-2 py-1 rounded-md">
          <p className="text-sm font-semibold">{category}</p>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2 text-[#1a2e51]">{title}</h2>
    </div>
  );
};

export default Card5;
