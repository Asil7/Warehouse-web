// Import the Firebase scripts
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCKvdHGuLjO6FZsd4nVEffKm-yIHnL2uew",
  authDomain: "warehouse-14660.firebaseapp.com",
  projectId: "warehouse-14660",
  storageBucket: "warehouse-14660.firebasestorage.app",
  messagingSenderId: "528147989378",
  appId: "1:528147989378:web:8e3445d9366b733fdfc59b",
  measurementId: "G-674958JBV7",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  const route = event.notification.data.route;

  event.waitUntil(
    clients.openWindow(route).then(() => {
      event.notification.close();
    })
  );
});
