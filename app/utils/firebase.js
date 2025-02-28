import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-LXlcAmBYjSrk3cZyezuhLRhU7Z-kAgE",
  authDomain: "enews-22664.firebaseapp.com",
  projectId: "enews-22664",
  storageBucket: "enews-22664.appspot.com",
  messagingSenderId: "983457321300",
  appId: "1:983457321300:web:7572961ddaebc2bdbc38c1",
  measurementId: "G-H24LR9S22B",
};

// ✅ Initialize Firebase (only once)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// ✅ Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ✅ Ensure Messaging is only initialized in the browser
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
  if (typeof window === "undefined") return null;

  try {
    const permission = await Notification.requestPermission();
    console.log("Permission result:", permission);

    if (permission === "granted" && messaging) {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPI_KEY,
      });

      if (!token) {
        console.warn("No FCM token received, Incognito mode may be blocking it.");
        return null;
      }

      console.log("FCM Token:", token);
      if (userId && db) {
        await setDoc(doc(db, "pushNotifications", userId), { userId, FCMTOKEN: token });
      }

      return token;
    } else {
      console.warn("Notifications blocked by user or browser settings.");
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
    import("react-hot-toast").then(({ default: toast }) => {
      toast(payload.notification?.body || "New Notification", { icon: "🔔" });
    });
  });
}

// ✅ Export services
export { app, auth, db, provider };
