import { httpAxios } from "../utils/httpAxios";

export async function createComments({ article, user, content }) {

    try {
        const response = await httpAxios.post(`/comments`, { articleId: article._id, content });
        return response.data?.data?.comment;
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
}
export async function getComments() {

    try {
        const response = await httpAxios.get(`/comments`);
        return response.data?.data?.comments || [];
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
}