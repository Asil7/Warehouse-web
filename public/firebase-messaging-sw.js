// Import Firebase libraries
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

// Initialize Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyCKvdHGuLjO6FZsd4nVEffKm-yIHnL2uew",
  authDomain: "warehouse-14660.firebaseapp.com",
  projectId: "warehouse-14660",
  storageBucket: "warehouse-14660.firebasestorage.app",
  messagingSenderId: "528147989378",
  appId: "1:528147989378:web:8e3445d9366b733fdfc59b",
  measurementId: "G-674958JBV7",
});

// Retrieve messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.ico", // Customize the icon
    vibrate: [200, 100, 200],
    data: { route: payload.data.route }, // Attach custom data (e.g., route)
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  const route = event.notification.data?.route;

  console.log("Notification clicked, route: ", route);

  event.notification.close(); // Close the notification
  if (route) {
    event.waitUntil(clients.openWindow(route)); // Open the route
  }
});
