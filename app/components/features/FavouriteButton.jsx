import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const FavoriteButton = ({ isFavorite, toggleFavorite }) => (
  <button
    className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
      isFavorite
        ? "bg-red-500 text-white"
        : "bg-gray-800 bg-opacity-50 text-white"
    }`}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      toggleFavorite(); // This should toggle the state correctly
    }}
  >
    {isFavorite ? <Favorite /> : <FavoriteBorder />}{" "}
    {/* Ensure correct icon is displayed */}
  </button>
);

export default FavoriteButton;
