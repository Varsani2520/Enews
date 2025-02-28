import { httpAxios } from "./httpAxios";

export const getNews = async (category) => {
  try {
    const response = await httpAxios.get(
      `/search/v2/articlesearch.json?q=${category}&api-key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    console.log("API Response:", response.data);
    return response.data.response;
  } catch (error) {
    console.error("❌ API request failed:", error);
    throw error;
  }
};
