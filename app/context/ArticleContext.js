"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getNews } from "../utils/getNews";

const ArticleContext = createContext();

export const useNews = () => {
  return useContext(ArticleContext);
};

export const ArticleProvider = ({ children }) => {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState({});

  // Load session storage data when provider mounts
  useEffect(() => {
    const cachedData = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.startsWith("news_")) {
        cachedData[key.replace("news_", "")] = JSON.parse(sessionStorage.getItem(key) || "{}");
      }
    }
    setNewsData(cachedData);
  }, []);

  const fetchNews = async (category) => {
    if (newsData[category]) return; // Avoid re-fetching if data exists
    setLoading((prev) => ({ ...prev, [category]: true }));

    // Check if cached in sessionStorage
    const cachedData = sessionStorage.getItem(`news_${category}`);
    if (cachedData) {
      console.log(`✅ Using cached data for ${category} from sessionStorage`);
      setNewsData((prev) => ({
        ...prev,
        [category]: JSON.parse(cachedData),
      }));
      setLoading((prev) => ({ ...prev, [category]: false }));
      return;
    }

    console.log(`🔄 Fetching fresh data for ${category} from API...`);
    try {
      const data = await getNews(category);
      console.log(`✅ API Response for ${category}:`, data);

      // Store in sessionStorage
      sessionStorage.setItem(`news_${category}`, JSON.stringify(data.docs));

      setNewsData((prev) => ({ ...prev, [category]: data.docs }));
    } catch (error) {
      console.error(`❌ Error fetching news for ${category}:`, error);
    }

    setLoading((prev) => ({ ...prev, [category]: false }));
  };

  return (
    <ArticleContext.Provider value={{ newsData, fetchNews, loading }}>
      {children}
    </ArticleContext.Provider>
  );
};
