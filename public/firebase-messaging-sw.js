importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC-LXlcAmBYjSrk3cZyezuhLRhU7Z-kAgE",
  authDomain: "enews-22664.firebaseapp.com",
  projectId: "enews-22664",
  storageBucket: "enews-22664.appspot.com",
  messagingSenderId: "983457321300",
  appId: "1:983457321300:web:7572961ddaebc2bdbc38c1",
  measurementId: "G-H24LR9S22B",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message", payload);

  if (!payload.notification) return;

  const { title = "New Update", body = "Check out the latest news update!" } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: "/logo.png",
    badge: "/logo.png", // Optional
    data: { url: payload?.data?.click_action || "/" },
  });
});

// Handle notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || "/"));
});
