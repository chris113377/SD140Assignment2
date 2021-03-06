const staticCacheName = 'v2';
const filesToCache = [
  './',
  './styles/test.css',
  './styles/contact.css',
  './styles/index.css',
  './styles/normalize.css',
  './index.html',
  './aboutus.html',
  './contact.html',
  './staff.html',
  "https://fonts.googleapis.com/css?family=Lato&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css",
  "https://placekitten.com/295/200",
  "https://placekitten.com/295/201",
  "https://placekitten.com/295/203"
];


self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => cache.addAll(filesToCache))
      .then(() => self.skipWaiting())
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== staticCacheName) {
            console.log('[Service Worker] Removing old cache.', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      } else {
        return fetch(event.request)
          .then(res => {
            return caches.open(staticCacheName)
              .then(cache => {
                cache.put(event.request.url, res.clone());
                return res;
              })
          })
          .catch(err => console.log(err));
      }
    })
  );
});