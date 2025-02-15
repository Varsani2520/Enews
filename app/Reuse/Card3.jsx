import React from "react";
import useArticleLike from "../hooks/ArticleLikes";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const Card3 = ({ title, imageUrl, height, width, marginBottom, article }) => {

  const { isFavorite, toggleFavorite } = useArticleLike(article);

  return (
    <div
      className="bg-gray-200 border border-gray-300 rounded-lg p-4"
      style={{ height, width, marginBottom }}
      onClick={()=>handleArticleClick(article)}
    >
      {/* Image */}
      <div className="w-full h-48">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={imageUrl}
          alt="Card Background"
          style={{ borderRadius: "10px" }}
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
      </div>

      {/* Title Container */}
      <div className=" p-2 ">
        <h2 className="text-[#0f1f40] text-lg font-semibold">{title}</h2>
      </div>
    </div>
  );
};

export default Card3;
