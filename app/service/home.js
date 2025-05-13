import { httpAxios } from "../utils/httpAxios";

export async function getHome() {
  try {
    const resposne = await httpAxios.get("/home");
    return resposne.data.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}