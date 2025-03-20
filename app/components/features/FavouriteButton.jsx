import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const FavoriteButton = ({ isFavorite, toggleFavorite }) => (
  <button
    className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
      isFavorite ? "bg-red-500 text-white" : "bg-gray-800 bg-opacity-50 text-white"
    }`}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      toggleFavorite();
    }}
  >
    {isFavorite ? <Favorite /> : <FavoriteBorder />}
  </button>
);

export default FavoriteButton;
