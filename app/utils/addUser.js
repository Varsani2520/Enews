import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function AddUser(userData) {
  try {
    console.log("userData", userData);

    // this store user into database
    const docRef = await addDoc(collection(db, "users"), userData);
    console.log("doc id", docRef.id);

  } catch (error) {
    console.log(error);
  }
}