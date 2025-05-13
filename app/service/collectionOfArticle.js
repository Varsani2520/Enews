import { httpAxios } from "../utils/httpAxios";

export async function getArticleBasedonCategory(slug) {

    try {
        const response = await httpAxios.get(`/articles/category/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
}