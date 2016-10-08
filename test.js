var express = require('express');
var http = require('http');
var app = express();
var parseString = require('xml2js').parseString;
var requestURL = "http://api.cctraffic.net/feeds/map/Traffic.aspx?id=17&type=incident&max=25&bLat=42.203097639603264%2C42.459441175790076&bLng=-83.25866010742186%2C-82.83293989257811&sort=severity_priority%20asc";
var xml = http.request(requestURL);
console.log("XML: " + xml);
parseString(xml, function(err, result) {
        console.log(jsonTrafficData = JSON.stringify(result));
});