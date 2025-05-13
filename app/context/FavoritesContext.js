import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites } from "../service/favs";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await getFavorites();
        setFavorites(res.data.favorites.articles || []);
      } catch (err) {
        setError(err.message || "Failed to fetch favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, loading, error, setFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
