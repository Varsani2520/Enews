import { api_key, httpAxios } from "./httpAxios";

export const getNews = async (category, retries = 3, delay = 5000) => {
  try {
    const response = await httpAxios.get(
      `/search/v2/articlesearch.json?q=${category}&api-key=${api_key}`
    );
    return response.data.response;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.warn(`⏳ Rate limit hit. Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return getNews(category, retries - 1, delay * 2); // Exponential backoff
    }
    console.error("❌ API request failed:", error);
    throw error;
  }
};
