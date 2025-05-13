import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db, provider } from "./firebase";
import { httpAxios } from "./httpAxios";
import Cookies from "js-cookie";

// handle Google signin authenticaltion
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    // save user data to firestore
    await saveUserDataToFirestore(result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
/**
 * Handles Email & Password Login
 */
export const loginWithEmail = async (userData) => {
  try {
    const response = await httpAxios.post("/auth/login", {
      email: userData.email,
      password: userData.password,
    })
    console.log("res user", response)
    const user = response.data?.data?.user;

    if (!user) {
      throw new Error("User data is missing in response");
    }
     Cookies.set("user", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
// handle email & apssword signup
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

    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};


