import fetch from 'whatwg-fetch';

export const testFunction = (test) => {
	console.log("Successful Test Function " + test);

	// fetch('/api/trafficData')
	//   .then(function(response) {
	//     return response.json()
	//   }).then(function(json) {
	//     console.log('parsed json', json)
	//   }).catch(function(ex) {
	//     console.log('parsing failed', ex)
	// 	})

	 return {
	 	test: true
	 }
}