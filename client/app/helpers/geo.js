var getCoordinatesAsync = function(options){
	if(!options) options = {};
	return new Promise(function(resolve, reject){
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}

function postUserLocation([geo, src, destination]){
	return fetch('/api/trafficData', {
  	method: 'POST',
  	body: {
    	src: 'Hubot',
    	destination: 'hubot',
    	location: '',
  	}
	});
}

// var Promise = require('bluebird');
// Promise.all([
// 	resolveUserStringToRealLocation(fdsa),
// 	resolveUserStringToRealLocation(gfds)
// ]).then(function([fdsaLoc, gfdsLoc]){

// })

export function trafficCall(src, destination) {
	var myGeo;
	return getCoordinatesAsync()
	.then(function(geo){
		myGeo = geo;
		return [geo, src, destination]
	})
	.then(postUserLocation)
	.then(function(){
		return myGeo;
	});
}