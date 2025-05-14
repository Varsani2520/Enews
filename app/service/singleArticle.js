import { httpAxiosForHome } from "../utils/httpAxios";

export async function getSingleArticle(slug) {
  
  try {
    const response = await httpAxiosForHome.get(`/articles/slug/${slug}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}