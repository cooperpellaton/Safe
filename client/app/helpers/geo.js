// var Promise = require('bluebird');
// Promise.all([
// 	resolveUserStringToRealLocation(fdsa),
// 	resolveUserStringToRealLocation(gfds)
// ]).then(function([fdsaLoc, gfdsLoc]){

// })

var getCoordinatesAsync = function(options){
	if(!options) options = {};
	return new Promise(function(resolve, reject){
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}

function getUserTrafficData(){
	return fetch('/api/trafficData', {
  	method: 'GET'
	});
}

export function getTrafficCall() {
	var myGeo;
	return getUserTrafficData()
	.then(function(){
		console.log(arguments);
		return postTrafficData(arguments[0].body);
	});
}

export function getTestTrafficCall() {
	var myGeo;
	return getUserTrafficData()
	.then(function() {
		console.log(arguments);
		return arguments[0].body;
	});
}

export function postTrafficData(resp){
	return fetch('/api/doSomeML', {
  	method: 'POST',
  	body: resp
	});
}

export function busCall(src, destination) {
	var myGeo;
	return getCoordinatesAsync()
	.then(function(geo){
		myGeo = [geo.coords.latitude, geo.coords.longitude];
		return [geo, src, destination]
	})
	.then(postUserGeoData)
	.then(function(){
		return myGeo;
	});
}

// http://50.116.48.206:3000
function postUserGeoData([geo, src, destination]){
	return fetch('/api/nextBus', {
  	method: 'POST',
  	body: {
    	geo: geo,
    	src: src,
    	destination: destination,
  	}
	});
}