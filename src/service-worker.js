const CACHE_NAME = "live-score-v1";
var urlsToCache = [
    '/',
    '/index.html',
    '/public/css/main.css'
];

self.addEventListener("install", function (event) {
    console.log('Install Event processing')
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }).catch(err => {
                console.log(`error: ${err}`)
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});