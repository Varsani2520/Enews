import { httpAxios } from "../utils/httpAxios";

export async function createComments({ article, content }) {

    try {
        const response = await httpAxios.post(`/comments`, { articleId: article._id, content });
        return response.data?.data?.comment;
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
}
export async function getComments(article) {

    try {
        const response = await httpAxios.get(`/comments/article/${article._id}`);
        console.log("🚀 Comments API response:", response.data);
        return response.data?.data?.comments || [];
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
}