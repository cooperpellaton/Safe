var coordsPromise = new Promise(function(resolve, reject) {
  window.navigator.geolocation.getCurrentPosition(resolve);
}).then(function(geo) {
  return geo.coords.latitude + ":" + geo.coords.longitude;
});

export default coordsPromise;