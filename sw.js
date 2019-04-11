const CACHE_NAME = "V1"
const expectedCaches = [CACHE_NAME];
const staticFiles = [
		'/',
		'/index.html',
        '/main.css',
        '/main.js',
];



/**
 * The install event is fired when the registration succeeds. 
 * After the install step, the browser tries to activate the service worker.
 * Generally, we cache static resources that allow the website to run offline
*/
this.addEventListener('install', async function() {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
        '/',
		'/index.html',
        '/main.css',
        '/main.js',
    ])
})

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME && key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
    return self.clients.claim();
});
  

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);

    e.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );

});
 