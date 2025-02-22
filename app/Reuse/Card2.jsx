import React from "react";
import useArticleLike from "../hooks/ArticleLikes";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { addHandleArticleClick } from "../hooks/ArticleClick";

const Card2 = ({ category, title, imageUrl, height, width, article }) => {
  const { isFavorite, toggleFavorite } = useArticleLike(article);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg bg-white mb-4"
      style={{ height, width }}
      onClick={() => addHandleArticleClick(article)}
    >
      {/* Background Image */}
      <img
        className="object-cover w-full h-full"
        src={imageUrl}
        alt="Card Background"
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
      {/* Category and Title */}
      <div className="absolute bottom-0 left-0  text-white p-4">
        <div className=" bg-red-700 text-white text-lg font-semibold  px-2 py-1 rounded-md inline-block">
          {category}
        </div>{" "}
        <div className=" font-bold text-lg font-semibold">{title}</div>
      </div>
    </div>
  );
};

export default Card2;
