import React from "react";
import { useArticleLikes } from "@/app/hooks/useArticleLikes";
import { addHandleArticleClick } from "@/app/hooks/useArticleClick";
import FavoriteButton from "@/app/components/features/FavouriteButton";
import { useThemeContext } from "@/app/context/ThemeContext";

const Card5 = ({ category, title, imageUrl, article, height }) => {
  const { isArticleFavorite, toggleFavorite, loading } = useArticleLikes(
    article?._id
  ); // Use the hook here

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Show loading text or spinner
  }
  const { themeData } = useThemeContext();
  return (
    <div className="relative overflow-hidden group">
      <div
        className="relative w-full"
        style={{ height: height }}
        onClick={() => addHandleArticleClick(article)}
      >
        <img
          src={imageUrl || "/placeholder.jpg"}
          alt={title}
          className="w-full h-full  object-fit rounded"
        />

        <FavoriteButton
          isFavorite={isArticleFavorite(article?._id)}
          toggleFavorite={() => toggleFavorite(article?._id)}
        />

        {/* Category Label */}
        {category ? (
          <div
            className="absolute top-4 left-4  px-2 py-1 rounded-md"
            style={{
              backgroundColor: themeData?.buttonBg, // Themed accent color
              color: themeData?.buttonText, // Themed text color
            }}
          >
            <p className="text-sm font-semibold">{category}</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* Title */}
      <h2
        className="text-sm md:text-lg font-semibold mb-2 group-hover:text-red-500 transition-colors duration-300"
        style={{ color: themeData?.navText }}
      >
        {title}
      </h2>
    </div>
  );
};

export default Card5;
