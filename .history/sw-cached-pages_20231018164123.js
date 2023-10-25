const cacheName = "v1";
const cacheAssets = [
  './index.html',
  './cekiny-perly-dzety',
  './druk-cyfrowy',
  './sublimacja',
  './aplikacje-laserowe',
  './kontakt',
  './en/index.hml',
  './en/sequins-pearls-jet',
  './en/digital-print',
  './en/sublimation',
  './en/laser-apps',
  './en/contact',
  './css/style.css',
  './js/photoswipe.umd.min.js',
  './js/photoswipe-lightbox.umd.min.js'
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