import { api_key, httpAxios } from "./httpAxios";

export const getNews = async (category) => {
  try {
    const response = await httpAxios.get(
      `/search/v2/articlesearch.json?q=${category}&api-key=${api_key}`
    );
    console.log("API Response:", response.data);
    return response.data.response;
  } catch (error) {
    console.error("❌ API request failed:", error);
    throw error;
  }
};
