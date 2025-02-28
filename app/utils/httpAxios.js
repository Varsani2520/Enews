import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "https://api.nytimes.com/svc",
});

