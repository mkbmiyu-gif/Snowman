const CACHE_NAME = "meigi-pro-v1";

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

    .then(cache =>

      cache.addAll([

        "./",

        "./index.html",

        "./style.css",

        "./app.js",

        "./manifest.json"

      ])

    )

  );

});

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)

    .then(response =>

      response || fetch(event.request)

    )

  );

});