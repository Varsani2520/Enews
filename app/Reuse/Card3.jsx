import React from "react";
import useArticleLike from "../hooks/ArticleLikes";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { addHandleArticleClick } from "../hooks/ArticleClick";

const Card3 = ({ title, imageUrl, height, width, marginBottom, article }) => {
  const { isFavorite, toggleFavorite } = useArticleLike(article);

  return (
    <div
      className="bg-gray-200 border border-gray-300 rounded-lg p-4 relative"
      style={{ height, width, marginBottom }}
      onClick={() => addHandleArticleClick(article)}
    >
      <div>
        {/* Image */}
        <img
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
          src={imageUrl}
          alt="Card Background"
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
          {isFavorite ? <Favorite /> : <FavoriteBorder />}{" "}
        </button>
      </div>

      {/* Title Container */}
      <div className=" p-2 ">
        <h2 className="text-sm md:text-lg font-semibold font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default Card3;
