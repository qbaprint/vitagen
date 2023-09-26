const cacheName = "v1";
const cacheAssets = [
  './index.html',
  './lista-zadan.html',
  './lista-zakupow.html',
  './pon.html',
  './wt.html',
  './sr.html',
  './czw.html',
  './pt.html',
  './zj-pon.html',
  './zj-wt.html',
  './zj-sr.html',
  './zj-czw.html',
  './zj-pt.html',
  './zj-sob.html',
  './zj-ndz.html',
  './app-lista-zadan.js',
  './app-lista-zakupow.js',
  './app-pon.js',
  './app-wt.js',
  './app-sr.js',
  './app-czw.js',
  './app-pt.js',
  './app-zj-pon.js',
  './app-zj-wt.js',
  './app-zj-sr.js',
  './app-zj-czw.js',
  './app-zj-pt.js',
  './app-zj-sob.js',
  './app-zj-ndz.js',
  './css/style.css',
  './dist/mmenu-light.css',
  './dist/mmenu-light.js'
];
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('ServiceWorker : Activated');

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing old Cache')
            return caches.delete(cache);
          }
        })
      )
    })
  )
});
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
})