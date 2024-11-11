// Import the Firebase scripts
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

// Initialize Firebase app by passing in the config
firebase.initializeApp({
  apiKey: "AIzaSyCKvdHGuLjO6FZsd4nVEffKm-yIHnL2uew",
  authDomain: "warehouse-14660.firebaseapp.com",
  projectId: "warehouse-14660",
  storageBucket: "warehouse-14660.appspot.com",
  messagingSenderId: "528147989378",
  appId: "1:528147989378:web:8e3445d9366b733fdfc59b",
  measurementId: "G-674958JBV7",
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // You can use any icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
