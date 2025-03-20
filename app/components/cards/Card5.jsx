import React from "react";
import useArticleLike from "@/app/hooks/useArticleLikes";
import { addHandleArticleClick } from "@/app/hooks/useArticleClick";
import FavoriteButton from "@/app/components/features/FavouriteButton";

const Card5 = ({ category, title, imageUrl, article, height }) => {
  const { isFavorite, toggleFavorite } = useArticleLike(article);

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

<FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />


        {/* Category Label */}
        {category ? (
          <div className="absolute top-4 left-4 bg-[#f20404] text-white px-2 py-1 rounded-md">
            <p className="text-sm font-semibold">{category}</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* Title */}
      <h2 className="text-sm md:text-lg font-semibold mb-2 text-[#1a2e51] group-hover:text-red-500 transition-colors duration-300">
        {title}
      </h2>
    </div>
  );
};

export default Card5;
