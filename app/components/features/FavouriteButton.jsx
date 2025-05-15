import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useThemeContext } from "@/app/context/ThemeContext";
import { useAuth } from "@/app/context/AuthContext";
import toast from "react-hot-toast";

const FavoriteButton = ({ isFavorite, toggleFavorite }) => {
  const { user } = useAuth();
  const { themeData } = useThemeContext();

  return (
    <button
      className="absolute top-2 right-2 p-2 rounded-full transition-all"
      style={{
        backgroundColor: isFavorite
          ? themeData?.icon?.main
          : themeData?.icon?.default,
        color: isFavorite ? themeData?.icon?.default : themeData?.icon?.main,
      }}
      onClick={(e) => {
        if (!user) {
          toast.error("Please log in to add to favorites!");
          return;
        }
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
