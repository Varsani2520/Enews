// utils/getUserFromLocalStorage.ts
export const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse user:", e);
      return null;
    }
  }
  return null;
};
