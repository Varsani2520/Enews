import React from "react";
import useArticleLike from "@/app/hooks/useArticleLikes";
import { addHandleArticleClick } from "@/app/hooks/useArticleClick";
import FavoriteButton from "@/app/components/features/FavouriteButton";


const Card4 = ({ imageUrl, category, title, article }) => {
  const { isFavorite, toggleFavorite } = useArticleLike(article);

  return (
    <div
      className="flex items-center bg-white shadow-md rounded-md overflow-hidden mb-4 relative"
      onClick={() => addHandleArticleClick(article)}
    >
      {/* Left side image */}
      <div className="flex-shrink-0">
        <img src={imageUrl} alt={title} className="w-32 h-32 object-cover " />
      </div>

      {/* Right side content */}
      <div className="px-3 py-0 flex-1">
        <div className="bg-red-700 text-white text-xs md:text-lg font-semibold px-3 w-fit rounded-lg">
          {category}
        </div>
        <h2 className="text-sm md:text-lg  font-bold mt-2 group-hover:text-red-500">{title}</h2>
      </div>

      <FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />

    </div>
  );
};

export default Card4;
