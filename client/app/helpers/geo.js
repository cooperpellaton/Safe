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
		console.log("GET CALL ARGUMENTS " + arguments);
		return arguments;
	});
}

function postUserTrafficData([geo, src, destination]){
	return fetch('/api/nextBus', {
  	method: 'POST',
  	body: {
    	src: '',
    	destination: 'hubot',
    	location: '',
  	}
	});
}

export function busCall(src, destination) {
	var myGeo;
	return getCoordinatesAsync()
	.then(function(geo){
		myGeo = geo;
		return [geo, src, destination]
	})
	.then(postUserTrafficData)
	.then(function(){
		return myGeo;
	});
}