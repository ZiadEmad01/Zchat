// firebase-messaging-sw.js
// هذا الملف لازم يكون في نفس مجلد index.html (في الـ root)، بدون أي تعديل في المسار.

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

// نفس إعدادات Firebase الموجودة في index.html بالظبط
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
firebase.initializeApp({
  apiKey:            "AIzaSyBRFnzb3yTJVtGxHtlxGYS848fm1duAifM",
  authDomain:        "zchat-341b9.firebaseapp.com",
  projectId:         "zchat-341b9",
  storageBucket:     "zchat-341b9.firebasestorage.app",
  messagingSenderId: "851472042433",
  appId:             "1:851472042433:web:02dcb6872c0a4b31340740",
});

const messaging = firebase.messaging();

// لما يجيلك إشعار والموقع/المتصفح مقفول أو في الخلفية، الكود ده هو اللي بيعرضه
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "رسالة جديدة";
  const body  = payload.notification?.body  || "";

  self.registration.showNotification(title, {
    body,
    icon: "/icon-192.png", // غيّرها لو عندك أيقونة بمسار مختلف، أو سيبها لو معندك
    badge: "/icon-192.png",
    data: payload.data || {},
  });
});

// لو المستخدم دوس على الإشعار، نفتحله الموقع
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});