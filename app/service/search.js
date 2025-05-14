import {  httpAxiosForHome } from "../utils/httpAxios";

export async function getSearch(slug) {

    try {
        const response = await httpAxiosForHome.get(`/search?query=${slug}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
}