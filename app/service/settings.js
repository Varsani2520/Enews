import {  httpAxiosForHome } from "../utils/httpAxios";

export async function getSettings() {
  try {
    const resposne = await httpAxiosForHome.get("/web-setting");
    return resposne.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}