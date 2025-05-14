
import { httpAxios } from "./httpAxios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
// ------------------------- Login -------------------------
export const loginWithEmail = async (userData) => {
  try {
    const response = await httpAxios.post("/auth/login", {
      email: userData.email,
      password: userData.password,
    });
    const user = response.data?.data?.user;

    if (!user) {
      throw new Error("User data is missing in response");
    }
    
    // Save user and access token to cookies
    Cookies.set("user", encodeURIComponent(JSON.stringify(user))); // Set cookie
    Cookies.set("accessToken", response.data?.data?.accessToken); // Set access token

    toast.success("Login successful 🎉");
    return user;
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.response?.data?.message || "Login failed ❌");
    toastShown = false;  // Reset flag in case login fails
    throw error;
  }
};
// ------------------------- Signup -------------------------
export const signUpWithEmail = async (userData) => {
  try {
    const formData = new FormData();
    formData.append("fullname", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("phone_no", userData.phone_no);
    formData.append("role", "user");

    if (userData.avatar) {
      formData.append("avatar", userData.avatar); // avatar must be a File object
    }

    const response = await httpAxios.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const user = response.data?.data?.user;
    Cookies.set("user", encodeURIComponent(JSON.stringify(user)));
    toast.success("Signup successful 🎉");
    return user;
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(error.response?.data?.message || "Signup failed ❌");

    throw error;
  }
};

// ------------------------- Logout -------------------------
export const logoutUser = async (setUser) => {
  try {
    await httpAxios.post("/auth/logout");
    toast.success("Logged out successfully");
  } catch (err) {
    console.error("Logout error (non-fatal):", err);
    toast.error("Logout failed");
  } finally {
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null)
  }
};

// ------------------------- Delete User -------------------------
export const deleteUserById = async (setUser) => {
  if (!user?.id) return toast.error("User ID not found");
  try {
    const res = await httpAxios.delete(`/auth/delete`);
    toast.success("User deleted successfully");
    return res.data;
  } catch (err) {
    console.error("Delete user error:", err);
    toast.error(err.response?.data?.message || "Delete failed");
  }
  finally {
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
  }
};

// ------------------------- Update User -------------------------
export const updateUserById = async (updatedData) => {
  try {
    const formData = new FormData();
    for (const key in updatedData) {
      formData.append(key, updatedData[key]);
    }

    const response = await httpAxios.put("/auth/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const user = response.data?.data?.user;
    toast.success("Profile updated successfully");
    return user;
  } catch (err) {
    console.error("Update user error:", err);
    toast.error(err.response?.data?.message || "Update failed");
    throw err;
  }
};
