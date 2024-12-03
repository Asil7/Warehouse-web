import { getMessaging, onMessage } from "firebase/messaging";
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKvdHGuLjO6FZsd4nVEffKm-yIHnL2uew",
  authDomain: "warehouse-14660.firebaseapp.com",
  projectId: "warehouse-14660",
  storageBucket: "warehouse-14660.firebasestorage.app",
  messagingSenderId: "528147989378",
  appId: "1:528147989378:web:8e3445d9366b733fdfc59b",
  measurementId: "G-674958JBV7",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};

export const setupOnMessageListener = (navigate) => {
  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);

    if (Notification.permission === "granted") {
      const notification = new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/favicon.ico",
      });

      notification.onclick = () => {
        const route = payload.data.route;
        if (route) {
          navigate(route); // Navigate using React Router
        }
      };
    } else {
      console.log("Notification permission not granted.");
    }
  });
};
