"use client";
import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/utils/firebase";

const FavoritesPage = () => {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const q = query(collection(db, "users", user.email, "favorites"));
        const querySnapshot = await getDocs(q);
        const favs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFavorites(favs);
        console.log("favs",favs);
        
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Favorite Articles</h2>
      {favorites.length === 0 ? (
        <p>No favorite articles yet.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {favorites.map((article) => (
            <li key={article.id} className="bg-gray-100 p-4 rounded-lg">
              {article.article.headline.main}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
