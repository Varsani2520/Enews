"use client";
import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import useArticleLike from "../hooks/ArticleLikes";
import { handleArticleClick } from "../hooks/ArticleClick";

const Card1 = ({
  height,
  width,
  marginBottom,
  article,
  imageUrl,
  category,
  title,
}) => {
  const { isFavorite, toggleFavorite } = useArticleLike(article);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg"
      style={{
        height: height || "300px",
        width: width || "100%",
        marginBottom,
      }}
      onClick={() => handleArticleClick(article)}
    >
      <img
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
        src={imageUrl}
        alt="Card Background"
      />

      <div className="absolute top-2 left-2 bg-red-700 text-white text-lg font-semibold px-2 py-1 rounded-md">
        {category}
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-2">
        <h2 className="text-lg font-semibold text-white font-bold">{title}</h2>
      </div>
      {/* like button */}
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
    </div>
  );
};

export default Card1;
