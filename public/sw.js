// public/sw.js
self.addEventListener('fetch', function (event) {
    // Minimal fetch handler to satisfy PWA requirements
});

self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/odd.png',
            badge: '/odd.png',
            tag: 'temp-mail-notif',
            renotify: true
        };
        event.waitUntil(self.registration.showNotification(data.title, options));
    }
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data || '/')
    );
});
