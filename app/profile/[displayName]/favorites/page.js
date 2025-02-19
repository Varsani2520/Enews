"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // ✅ Import deleteDoc
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/utils/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

const FavoritesPage = () => {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, `users/${user.email}/favorites`) // ✅ Fixed collection path
        );
        const favs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data().article,
        }));
        setFavorites(favs);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user]);

  const removeFavorite = async (articleId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, `users/${user.email}/favorites/${articleId}`)); // ✅ Ensure correct doc path
      setFavorites((prev) => prev.filter((article) => article.id !== articleId));
    } catch (error) {
      console.error("Error deleting favorites:", error); // ✅ Fixed typo
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Favorite Articles</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite articles yet.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {favorites.map((article) => (
            <li key={article.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
              <Link
                href={`/news/${encodeURIComponent(article.headline?.main)}`} // ✅ Encode for safe URL
                className="text-blue-600 hover:underline"
              >
                {article.headline?.main}
              </Link>
              <DeleteIcon
                onClick={() => removeFavorite(article.id)}
                sx={{ cursor: "pointer", color: "red" }}
                titleAccess="Remove from favorites"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
