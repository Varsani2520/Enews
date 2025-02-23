import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyC-LXlcAmBYjSrk3cZyezuhLRhU7Z-kAgE",
  authDomain: "enews-22664.firebaseapp.com",
  projectId: "enews-22664",
  storageBucket: "enews-22664.appspot.com",
  messagingSenderId: "983457321300",
  appId: "1:983457321300:web:7572961ddaebc2bdbc38c1",
  measurementId: "G-H24LR9S22B",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
const messaging = getMessaging(app);

// Register service worker
export const registerServiceWorker = async () => {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log("Service Worker registered:", registration);
      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};

// Request notification permission and get FCM token
export const requestNotificationPermission = async (userId) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {

      const token = await getToken(messaging, {
        vapidKey:
          "BFcbQvJZOyeaTYMRctstme-0yb9mG0fU089_y-4okGDZiCVsooidONnkntXa56-kE-uYDZNHQFP_EnYNfYfeqLU",
      });
      console.log("FCM Token:", token);

      if (userId) {
        // Store the FCM token in Firestore under the user's document
        await setDoc(doc(db, "users", userId), { fcmToken: token }, { merge: true });
        console.log("FCM Token saved to Firestore");
      }
      return token;
    } else {
      console.warn("Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// ✅ Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);

  if (document.visibilityState === "visible") {
    toast(payload.notification?.body || "New Notification", { icon: "🔔" });
  } else {
    new Notification(payload.notification?.title || "New Update", {
      body: payload.notification?.body || "Check the latest update!",
      icon: "/logo.png",
    });
  }
});
