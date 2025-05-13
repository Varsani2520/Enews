import React from "react";
import { useArticleLikes } from "@/app/hooks/useArticleLikes";
import { addHandleArticleClick } from "@/app/hooks/useArticleClick";
import FavoriteButton from "@/app/components/features/FavouriteButton";
import { useThemeContext } from "@/app/context/ThemeContext";

const Card2 = ({ category, title, imageUrl, height, width, article }) => {
  const { isArticleFavorite, toggleFavorite, loading } = useArticleLikes(
    article?._id
  ); // Use the hook here

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Show loading text or spinner
  }
  const { themeData } = useThemeContext(article?._id);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg mb-4 group cursor-pointer"
      style={{ height: height || "300px", width: width || "100%" }}
      onClick={() => addHandleArticleClick(article)}
    >
      {/* Background Image */}
      <img
        className="object-fill w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
        src={imageUrl}
        alt={title}
      />
      {/* Like Button */}
      <FavoriteButton
        isFavorite={isArticleFavorite(article?._id)}
        toggleFavorite={() => toggleFavorite(article?._id)}
      />

      {/* Category and Title */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
        <div
          className=" text-xs md:text-sm lg:text-lg font-semibold px-2 py-1 rounded-md inline-block"
          style={{
            backgroundColor: themeData?.buttonBg,
            color: themeData?.buttonText,
          }}
        >
          {category}
        </div>
        <div
          className="text-sm md:text-lg  font-bold  mt-2 group-hover:text-red-500"
          style={{
            color: themeData?.buttonText,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default Card2;
