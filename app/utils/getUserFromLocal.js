// utils/getUserFromCookies.ts
import Cookies from "js-cookie";

export const getUserFromCookies = () => {
  if (typeof window === "undefined") return null;

  const userCookie = Cookies.get("user");
  try {
    return userCookie ? JSON.parse(userCookie) : null;
  } catch (err) {
    console.error("Failed to parse user from cookie:", err);
    return null;
  }
};
