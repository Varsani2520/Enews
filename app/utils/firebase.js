import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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

// ✅ Initialize Firebase only if it hasn’t been initialized already
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ✅ Ensure Messaging is only used in the browser
let messaging;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

// ✅ Function to register Service Worker (Safe for Next.js)
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

// ✅ Function to request push notification permission
export const requestNotificationPermission = async (userId) => {
  if (typeof window === "undefined") return null; // Prevent running in SSR

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted" && messaging) {
      const token = await getToken(messaging, {
        vapidKey:
          "BFcbQvJZOyeaTYMRctstme-0yb9mG0fU089_y-4okGDZiCVsooidONnkntXa56-kE-uYDZNHQFP_EnYNfYfeqLU",
      });

      console.log("FCM Token:", token);

      if (userId && db) {
        const { setDoc, doc } = await import("firebase/firestore");
        await setDoc(
          doc(db, "users", userId),
          { fcmToken: token },
          { merge: true }
        );
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

// ✅ Listen for messages only on the client-side
if (typeof window !== "undefined" && messaging) {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    toast(payload.notification?.body || "New Notification", { icon: "🔔" });
  });
}

export { app, auth, db, provider };
