"use client";
import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import useArticleLike from "../hooks/ArticleLikes";
import { addHandleArticleClick } from "../hooks/ArticleClick";

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
      className="relative overflow-hidden group  rounded-lg shadow-lg mb-4 cursor-pointer"
      style={{
        height: height || "300px",
        width: width || "100%",
        marginBottom,
      }}
      onClick={() => addHandleArticleClick(article)}
    >
      <img
        className="object-fill w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
        src={imageUrl}
        alt={title}
      />

      <div className="absolute top-2 left-2 bg-red-700 text-white text-xs md:text-lg font-semibold px-3 py-1 rounded-lg">
        {category}
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-2 transition-colors duration-300">
        <h2 className="text-sm md:text-lg font-semibold text-white font-bold group-hover:text-red-600">
          {title}
        </h2>
      </div>

      {/* like button */}
      <button
        className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
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
        {isFavorite ? <Favorite /> : <FavoriteBorder />}{" "}
      </button>
    </div>
  );
};

export default Card1;
