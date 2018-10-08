//register service worker
if ("serviceWorker" in navigator) {
  console.log("This browser supports service workers");

  navigator.serviceWorker.register("serviceworker.js").then(function() {
    console.log("The serviceworker is registered");
  });
}
