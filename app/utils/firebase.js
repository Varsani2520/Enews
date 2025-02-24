import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import toast from "react-hot-toast";

// Ensure Firebase is initialized only in the browser
const isBrowser = typeof window !== "undefined";

const firebaseConfig = {
  apiKey: "AIzaSyC-LXlcAmBYjSrk3cZyezuhLRhU7Z-kAgE",
  authDomain: "enews-22664.firebaseapp.com",
  projectId: "enews-22664",
  storageBucket: "enews-22664.appspot.com",
  messagingSenderId: "983457321300",
  appId: "1:983457321300:web:7572961ddaebc2bdbc38c1",
  measurementId: "G-H24LR9S22B",
};

let app;
let messaging;

if (isBrowser) {
  app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export const auth = isBrowser ? getAuth(app) : null;
export const db = isBrowser ? getFirestore(app) : null;
export const provider = isBrowser ? new GoogleAuthProvider() : null;

export const registerServiceWorker = async () => {
  if ("serviceWorker" in( typeof window != undefined && navigator)) {
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

export const requestNotificationPermission = async (userId) => {
  if (!isBrowser) return null; // Ensure it runs only in the browser

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
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

// ✅ Listen for foreground messages only if in browser
if (isBrowser) {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    toast(payload.notification?.body || "New Notification", { icon: "🔔" });
  });
}
