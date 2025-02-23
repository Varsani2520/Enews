import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db, doc, provider } from "./firebase";
import { setDoc } from "firebase/firestore";

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
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
// handle email & apssword signup
export const signUpWithEmail = async (name, email, password) => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0)
      throw new Error("Email already in use. Please log in.");

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // **Update Firebase Auth Profile**
    await updateProfile(user, { displayName: name });
   
    // Save user data to Firestore
    await saveUserDataToFirestore({ uid: user.uid, name, email });
    return { success: true, message: "Account created. Please log in." };
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
