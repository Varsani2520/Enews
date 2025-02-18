"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast"; // ✅ Add toast for feedback

const useArticleBookmark = (article) => {
  const [user] = useAuthState(auth);
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    if (user && article?._id) {
      checkBookmark();
    }
  }, [user, article]);
  // 🔹 Get Firebase-safe article ID
  const getArticleId = () => {
    if (!article || !article._id) return null;
    return article._id.replace(/[^a-zA-Z0-9-_]/g, "_");
  };
  // 🔹 Check if article is already liked
  const checkBookmark = async () => {
    const articleId = getArticleId();
    if (!user || !articleId) return;
    const docRef = doc(db, `users/${user.email}/bookmark/${articleId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setIsBookmark(true);
    }
  };
  // 🔹 Toggle like/unlike article
  const toggleBookmark = async () => {
    if (!user) {
      toast.error("Please log in to save Bookmarks.");
      return;
    }
    const articleId = getArticleId();
    if (!articleId) {
      toast.error("Article ID is missing.");
      return;
    }
    const docRef = doc(db, `users/${user.email}/bookmark/${articleId}`);
    if (isBookmark) {
      await deleteDoc(docRef);
      setIsBookmark(false);
      toast.success("Removed from Bookmarks.");
    } else {
      await setDoc(docRef, {
        email: user.email,
        articleId,
        article,
        timestamp: new Date().toISOString(),
      });
      setIsBookmark(true);
      toast.success("Added to Bookmarks!");
    }
  };
  return { isBookmark, toggleBookmark };
};

export default useArticleBookmark;