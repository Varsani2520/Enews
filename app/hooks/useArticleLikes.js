import toast from "react-hot-toast";
import {
  addFavorite,
  clearFavorites,
  removeFavorite,
} from "../service/favs";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";

export const useArticleLikes = () => {
  const { favorites, setFavorites, loading } = useFavorites();
  const { user } = useAuth();

  const isArticleFavorite = (articleId) => {
    return favorites.some((article) => article?._id === articleId);
  };

  const addToFavorites = async (articleId) => {
    if (!user) {
      toast.error("Please login to add favorites.");
      return;
    }
    try {
      await addFavorite(articleId);
      setFavorites((prev) => [...prev, { _id: articleId }]);
      toast.success("Added to favorites!");
    } catch (err) {
      toast.error("Failed to add to favorites");
    }
  };

  const removeFromFavorites = async (articleId) => {
    if (!user) {
      toast.error("Please login to remove favorites.");
      return;
    }
    try {
      await removeFavorite(articleId);
      setFavorites((prev) => prev.filter((a) => a._id !== articleId));
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error("Failed to remove from favorites");
    }
  };

  const toggleFavorite = async (articleId) => {
    if (!user) {
      toast.error("Please login to manage favorites.");
      return;
    }
    if (isArticleFavorite(articleId)) {
      await removeFromFavorites(articleId);
    } else {
      await addToFavorites(articleId);
    }
  };

  const clearAllFavorites = async () => {
    if (!user) {
      toast.error("Please login to clear favorites.");
      return;
    }
    try {
      await clearFavorites();
      setFavorites([]);
      toast.success("All favorites cleared");
    } catch (err) {
      toast.error("Failed to clear favorites");
    }
  };

  return {
    favorites,
    loading,
    isArticleFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearAllFavorites,
  };
};
