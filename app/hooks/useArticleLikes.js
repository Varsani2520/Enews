"use client";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast"; // ✅ Add toast for feedback
import { db } from "../utils/firebase";
import useCurrentUser from "./useCurrentUser";

const useArticleLike = (article) => {
  const user = useCurrentUser();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && article?._id) {
      checkFavorite();
    }
  }, [user, article]);
  // 🔹 Get Firebase-safe article ID
  const getArticleId = () => {
    if (!article || !article._id) return null;
    return article._id.replace(/[^a-zA-Z0-9-_]/g, "_");
  };
  // 🔹 Check if article is already liked
  const checkFavorite = async () => {
    const articleId = getArticleId();
    if (!user || !articleId) return;
    const docRef = doc(db, `users/${user.email}/favorites/${articleId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setIsFavorite(true);
    }
  };
  // 🔹 Toggle like/unlike article
  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please log in to save favorites.");
      return;
    }
    const articleId = getArticleId();
    if (!articleId) {
      toast.error("Article ID is missing.");
      return;
    }
    const docRef = doc(db, `users/${user.email}/favorites/${articleId}`);
    if (isFavorite) {
      await deleteDoc(docRef);
      setIsFavorite(false);
      toast.success("Removed from favorites.");
    } else {
      await setDoc(docRef, {
        email: user.email,
        articleId,
        article,
        timestamp: new Date().toISOString(),
      });
      setIsFavorite(true);
      toast.success("Added to favorites!");
    }
  };
  return { isFavorite, toggleFavorite };
};

export default useArticleLike;