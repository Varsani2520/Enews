"use client";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { getNews } from "../utils/getNews";

const ArticleContext = createContext();

export const useNews = () => {
  return useContext(ArticleContext);
};

export const ArticleProvider = ({ children }) => {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState({});

  const fetchNews = async (category) => {
    if (newsData[category]) return; // Avoid re-fetching if data exists
    setLoading((prev) => ({ ...prev, [category]: true }));

    const docRef = doc(db, "newsCache", "session");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(`📂 Firestore Data for ${category}:`, docSnap.data()); // Debugging log
    }

    if (docSnap.exists() && docSnap.data()[category]) {
      console.log(`✅ Using cached data for ${category} from Firestore`);
      setNewsData((prev) => ({
        ...prev,
        [category]: docSnap.data()[category],
      }));
      setLoading((prev) => ({ ...prev, [category]: false }));
      return;
    }

    console.log(`🔄 Fetching fresh data for ${category} from API...`);
    try {
      const data = await getNews(category);
      console.log(`✅ API Response for ${category}:`, data);

      await setDoc(docRef, { [category]: data.docs }, { merge: true });
      setNewsData((prev) => ({ ...prev, [category]: data.docs }));
    } catch (error) {
      console.error(`❌ Error fetching news for ${category}:`, error);
    }

    setLoading((prev) => ({ ...prev, [category]: false }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      deleteDoc(doc(db, "newsCache", "session")).then(() =>
        console.log("🗑️ Session cache cleared after timeout")
      );
    }, 3600000); // Clear cache after 1 hour (3600000 ms)

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ArticleContext.Provider value={{ newsData, fetchNews, loading }}>
      {children}
    </ArticleContext.Provider>
  );
};
