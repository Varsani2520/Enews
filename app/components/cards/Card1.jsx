"use client";
import React from "react";
import useArticleLike from "@/app/hooks/useArticleLikes";
import { addHandleArticleClick } from "@/app/hooks/useArticleClick";
import FavoriteButton from "@/app/components/features/FavouriteButton";
import { useThemeContext } from "@/app/context/ThemeContext";


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
  const {themeData}=useThemeContext()

  return (
    <div
      className="relative overflow-hidden group  rounded-lg shadow-lg mb-4 cursor-pointer bg-gradient-to-t from-black to-transparent"
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

      <div className="absolute top-2 left-2  text-xs md:text-lg font-semibold px-3 py-1 rounded-lg" 
        style={{
          backgroundColor: themeData?.buttonBg,
          color: themeData?.buttonText, 
        }}>
        {category}
      </div>

      <div  className="absolute bottom-0 left-0 w-full bg-gradient-to-t px-4 py-2 transition-colors duration-300">
        <h2    className="text-sm md:text-lg font-bold group-hover:text-red-500"
          style={{ color: themeData?.buttonText }}>
          {title}
        </h2>
      </div>

      {/* like button */}
      <FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />

    </div>
  );
};

export default Card1;
