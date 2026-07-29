// Simple PWA Service Worker for GroomWise
// Caches page assets for fast loads and offline fallback support.

const CACHE_NAME = 'groomwise-static-cache-v1'
const PRECACHE_ASSETS = [
  '/',
  '/favicon.svg',
  '/icons.svg',
]

// Install event — precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Activate event — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event — intercept requests to serve from cache or fetch from network
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return

  // Do not intercept hot dev server hot reloading files
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/_next') || url.hostname === 'localhost') {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse // Cache hit
        }

        // Fetch from network, then cache the result
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        }).catch(() => {
          // If offline and request is page navigate, return precached root
          if (event.request.mode === 'navigate') {
            return caches.match('/')
          }
        })
      })
  )
})
