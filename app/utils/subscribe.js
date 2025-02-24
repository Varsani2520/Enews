import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "./firebase";


export const subscribeUser = async (email) => {
  if (!email) {
    toast.error("Please enter a valid email address.");
    return;
  }

  try {
    // Check if user is already subscribed
    const q = query(collection(db, "subscribers"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      toast.error("You're already subscribed!");
      return;
    }

    // Store subscriber in Firestore
    await addDoc(collection(db, "subscribers"), {
      email,
      subscribedAt: new Date().toISOString(),
    });

    toast.success("Subscribed successfully! ");
  } catch (error) {
    toast.error("Subscription failed. Try again later.");
    console.error("Error subscribing user:", error);
  }
};
