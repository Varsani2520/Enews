import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db, provider } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { httpAxios } from "./httpAxios";

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
    const userCredential = httpAxios.post("/auth/login", {
      email: userData.email,
      password: userData.password,
    }).then((response) => {;
    console.log("User credential:", response);
    localStorage.setItem("user", JSON.stringify(response.data.data.user))})
    // return response.data.user;
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

/**
 * Saves user data to Firestore
 */
const saveUserDataToFirestore = async (user) => {
  if (!user?.uid) throw new Error("User UID is missing!");

  try {
    const userRef = doc(db, "users", user.email);
    const userData = {
      name: user.displayName || "Anonymous",
      email: user.email,
      createdAt: new Date(),
    };
    await setDoc(userRef, userData, { merge: true });
    console.log("User data saved to Firestore:", userData);
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};
