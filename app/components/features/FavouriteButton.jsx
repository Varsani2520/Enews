import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useThemeContext } from "@/app/context/ThemeContext";

const FavoriteButton = ({ isFavorite, toggleFavorite }) => {
  const { themeData } = useThemeContext();

  return (
    <button
      className="absolute top-2 right-2 p-2 rounded-full transition-all"
      style={{
        backgroundColor: isFavorite
          ? themeData?.icon?.main 
          : themeData?.icon?.default, 
        color: isFavorite
          ? themeData?.icon?.default
          : themeData?.icon?.main,
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite();
      }}
    >
      {isFavorite ? <Favorite /> : <FavoriteBorder />}
    </button>
  );
};

export default FavoriteButton;
