import React from "react";
import { useArticleLikes } from "@/app/hooks/useArticleLikes";
import { addHandleArticleClick } from "@/app/hooks/useArticleClick";
import FavoriteButton from "@/app/components/features/FavouriteButton";
import { useThemeContext } from "@/app/context/ThemeContext";

const Card4 = ({ imageUrl, category, title, article }) => {
  const { themeData } = useThemeContext();
  const { isArticleFavorite, toggleFavorite, loading } = useArticleLikes(
    article?._id
  ); // Use the hook here

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Show loading text or spinner
  }

  return (
    <div
      className="flex items-center  shadow-md rounded-md overflow-hidden mb-4 relative"
      style={{ background: themeData?.background }}
      onClick={() => addHandleArticleClick(article)}
    >
      {/* Left side image */}
      <div className="flex-shrink-0">
        <img src={imageUrl} alt={title} className="w-32 h-32 object-cover " />
      </div>

      {/* Right side content */}
      <div className="px-3 py-0 flex-1">
        <div
          className="  text-xs md:text-lg font-semibold px-3 w-fit rounded-lg"
          style={{
            backgroundColor: themeData?.buttonBg,
            color: themeData?.buttonText,
          }}
        >
          {category}
        </div>
        <h2
          className="text-sm md:text-lg  font-bold mt-2 group-hover:text-red-500"
          style={{ color: themeData?.cardText }}
        >
          {title}
        </h2>
      </div>

      <FavoriteButton
        isFavorite={isArticleFavorite(article?._id)}
        toggleFavorite={() => toggleFavorite(article?._id)}
      />
    </div>
  );
};

export default Card4;
