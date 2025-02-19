"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { auth, db } from "../utils/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

const useArticleBookmark = (article) => {
  const [user] = useAuthState(auth);
  const [isBookmark, setIsBookmark] = useState(false);

  // Memoize article ID to avoid redundant calculations
  const articleId = useMemo(() => {
    return article?._id ? article._id.replace(/[^a-zA-Z0-9-_]/g, "_") : null;
  }, [article]);

  // Function to check if the article is already bookmarked
  const checkBookmark = useCallback(async () => {
    if (!user || !articleId) return;
    try {
      const docRef = doc(db, `users/${user.email}/bookmark/${articleId}`);
      const docSnap = await getDoc(docRef);
      setIsBookmark(docSnap.exists());
    } catch (error) {
      console.error("Error checking bookmark:", error);
    }
  }, [user, articleId]);

  // Effect to check the bookmark when dependencies change
  useEffect(() => {
    checkBookmark();
  }, [checkBookmark]);

  // Function to toggle the bookmark status
  const toggleBookmark = useCallback(async () => {
    if (!user) {
      toast.error("Please log in to save Bookmarks.");
      return;
    }
    if (!articleId) {
      toast.error("Article ID is missing.");
      return;
    }

    try {
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
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Something went wrong. Try again.");
    }
  }, [user, articleId, isBookmark, article]);

  return { isBookmark, toggleBookmark };
};

export default useArticleBookmark;
