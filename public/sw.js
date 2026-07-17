const CACHE_NAME = "belle-luxe-v1";
const ASSETS = [
  "/",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/images/hero.jpg",
  "/images/hair.jpg",
  "/images/makeup.jpg",
  "/images/lashes.jpg",
  "/images/nails.jpg",
  "/images/kim.jpg",
  "/images/salon.jpg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(() => {
        // Some assets may fail; continue anyway.
      });
    }),
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request);
    }),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});
