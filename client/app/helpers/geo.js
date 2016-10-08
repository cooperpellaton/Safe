var getCoordinatesAsync = function(options){
	if(!options) options = {};
	return new Promise(function(resolve, reject){
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}

function postUserLocation(geo, src, destination){
	return fetch('/ajax/location', {
  	method: 'POST',
  	// headers: {
   //  	'Accept': 'application/json',
   //  	'Content-Type': 'application/json'
  	// },
  	body: {
    	src: 'Hubot',
    	destination: 'hubot',
    	location: '',
  	}
	});
}

export function trafficCall() {
	var myGeo;
	return getCoordinatesAsync()
	.then(function(geo){
		return myGeo = geo;
	})
	.then(postUserLocation)
	.then(function(){
		return myGeo;
	});
}