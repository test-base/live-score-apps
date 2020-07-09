console.log('if you see this service-worker is working fine!');

const CACHE_NAME = "live-score-v1";
var urlsToCache = [
    '/',
    // '/index.html', //fist load, will be cached with fetch
    // '/public/css/main.css' //this will combined to bundle.js,
    //                        //so its fine even when not included
    '/favorite.html',
    '/league.html',
    '/match.html',
    '/navbar.html',
];

self.addEventListener("install", function (event) {
    console.log('Install Event processing');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.open(CACHE_NAME)
        .then(async (cache) => {
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) {
                console.log(event.request, "is from cache");
                return cachedResponse;
            }

            console.log("not from cache, requested from ", event.request);
            const networkResponse = await fetch(event.request);
            event.waitUntil(
                cache.put(event.request, networkResponse.clone())
            );
            return networkResponse;
        }));
});

/* self.addEventListener("fetch", function (event) {
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
}); */

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