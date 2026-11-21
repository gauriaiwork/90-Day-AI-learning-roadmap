// Bump this on every deploy so returning users get the new version.
const CACHE_NAME = 'ai-roadmap-v4-news';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './snapshot.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first for precached app shell assets, network-first fallback for everything else
// (e.g. Google Fonts), so the app still works offline once loaded once.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // snapshot.json and news.json hold the fast-changing "AI right now" content: network-first,
  // so edits show up on the next visit; cached copy is the offline fallback.
  if (/\/(snapshot|news)\.json$/.test(new URL(event.request.url).pathname)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
