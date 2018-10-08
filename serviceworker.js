//add some event listeners

self.addEventListener("install", function(event) {
  console.log("Service worker installed");

  //must wait until service worker processing is finished
  event.waitUntil(
    //get from cache
    caches.open("static").then(function(cache) {
      //can now add to cache, yes even stuff from external URLs
      cache.addAll([
        "index.html",
        "js/app.js",
        "css/styles.css",
        "img/showcase.jpg",
        "img/showcase2.jpg",
        "img/icons/app-icon-96x96.png",
        "img/icons/app-icon-144x144.png",
        "img/icons/app-icon-256x256.png",
        "img/icons/app-icon-512x512.png",
        "https://fonts.googleapis.com/css?family=Raleway:200,100,400"
      ]);
      console.log("Assets added to cache");
    })
  );
});

self.addEventListener("activate", function() {
  console.log("Service worker activted");
});

self.addEventListener("fetch", function(event) {
  console.log("Service worker fetched");

  //use worker as network proxy
  event.respondWith(
    caches.match(event.request).then(function(res) {
      if (res) {
        //if from cache, return it
        return res;
      } else {
        //make actual network request
        return fetch(event.request);
      }
    })
  );
});
