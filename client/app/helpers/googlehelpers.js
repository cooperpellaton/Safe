var from = []
var to = []

var placeSearch, autocomplete, autocomplete1;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {types: ['geocode']});
  autocomplete1 = new google.maps.places.Autocomplete((document.getElementById('autocomplete1')), {types: ['geocode']});
}
export function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      to = [geolocation.lat, geolocation.longitude]
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
export 
function geolocate1() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      from = [geolocation.lat, geolocation.longitude]
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete1.setBounds(circle.getBounds());
    });
  }
}