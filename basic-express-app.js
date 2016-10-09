const path = require('path');
const express = require('express');
var app = express();

app.use('/client/compiled', express.static(path.resolve('client/compiled')));
app.use('/images', express.static(path.resolve('client/app/images')));
app.use('/styles', express.static(path.resolve('client/app/styles')));


app.get('/', function(req,res){
    res.sendFile(path.resolve('index.html'));
});

app.post("/api/nextBus", function(req, res) {
    var requestURL = "https://ddot-beta.herokuapp.com/api/api/where/vehicles-for-agency/DDOT.json?key=LIVEMAP";
    var returnedJSON = request(requestURL, callback);
    var englishStopName = req.body["stop_name"];
    var stopID = (returnedJSON["data"]["references"]["stops"]["name"]).equals(englishStopName);
    for (bus in returnedJSON["data"]["list"]) {
        if (bus["nextStop"].equals(stopID)) {
            return stop["nextStopTimeOffset"];
        }
    }
    return false;
});

app.get("/api/trafficData", function(req, res) {
    var requestURL = "http://api.cctraffic.net/feeds/map/Traffic.aspx?id=17&type=incident&max=25&bLat=42.203097639603264%2C42.459441175790076&bLng=-83.25866010742186%2C-82.83293989257811&sort=severity_priority%20asc";
    var xml = request(requestURL);
    console.log("XML: " + xml.body);
    var jsonTrafficData;
    parseString(xml, function(err, result) {
        jsonTrafficData = JSON.stringify(result);
    });
    var returnResponse = [];
    returnResponse.push(jsonTrafficData["location"]);
    returnResponse.push(jsonTrafficData["title"]);
    returnResponse.push(jsonTrafficData["description"]);
    console.log(returnResponse);
    res.send(returnResponse);
});

app.listen(3000);