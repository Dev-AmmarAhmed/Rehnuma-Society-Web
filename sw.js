/**
 * REHNUMA SERVICE WORKER (v1.0.0)
 * Strategy: Cache-first for core assets, Network-first for dynamic routes
 */

const CACHE_NAME = 'rehnuma-cache-v1';

const APP_SHELL_FILES = [
  '/',
  '/index.html',
  '/firebase-config.js',
  '/igris.js',
  '/manifest.json',
  '/User/admin.html',
  '/User/member.html',
  '/Igris/igris.html',
  '/Icon/icon.png',
  'https://cdn.tailwindcss.com'
];

// 1. Install Event: Cache Application Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL_FILES);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Cleanup Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Firestore / Firebase API calls ko service worker intercept na kare
  if (
    requestUrl.origin.includes('firestore.googleapis.com') ||
    requestUrl.origin.includes('firebaseio.com') ||
    requestUrl.origin.includes('identitytoolkit.googleapis.com') ||
    requestUrl.origin.includes('securetoken.googleapis.com')
  ) {
    return;
  }

  // Cache-First strategy with Network Fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (event.request.method === 'GET' && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
