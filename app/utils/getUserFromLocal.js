// utils/getUserFromCookies.ts
import Cookies from "js-cookie";

export const getUserFromCookies = () => {
  if (typeof window === "undefined") return null;

  const userCookie = Cookies.get("user");
  if (!userCookie) return null;

  try {
    return JSON.parse(decodeURIComponent(userCookie)); // just in case it was encoded
  } catch (err) {
    console.error("Failed to parse user from cookie:", err);
    return null;
  }
};
