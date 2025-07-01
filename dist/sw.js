// Service Worker Disabled - No Caching
// This service worker is intentionally disabled to prevent caching issues

const CACHE_NAME = "jobpsych-no-cache";

self.addEventListener("install", (_event) => {
  // Skip waiting and activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    // Clear all existing caches
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Never use cache, always fetch from network
  event.respondWith(
    fetch(event.request).catch((error) => {
      // For API calls that fail, return error response
      if (event.request.url.includes("/api/")) {
        return new Response(
          JSON.stringify({ error: "Network request failed" }),
          {
            status: 503,
            headers: { 
              "Content-Type": "application/json",
              "Cache-Control": "no-cache, no-store, must-revalidate",
              "Pragma": "no-cache",
              "Expires": "0"
            },
          }
        );
      }
      throw error;
    })
  );
});
