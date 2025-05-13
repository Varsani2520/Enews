import { httpAxios } from "../utils/httpAxios";

export async function getSearch(slug) {

    try {
        const response = await httpAxios.get(`/search?query=${slug}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
}