const path = require('path');
const express = require('express');
var parseString = require('xml2js').parseString;
var Promise = require('bluebird');

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

var convertToXml = Promise.promisify(parseString);
var extractInfo = function(data) {
    console.log(data);
    if (data.CCTraffic.location) {
        return {
            title: data.CCTraffic.location[0].title,
            description: data.CCTraffic.location[0].description
        };
    } else {
        return "no incidents";
    }
};
var makeUrl = function(params) {
    return `http://api.cctraffic.net/feeds/map/Traffic.aspx?${querystring.stringify(params)}`;
};

app.get("/api/trafficData", function(req, res) {
        Promise.props({
            id: 17,
            type: "incident",
            max: 25,
            bLat: "42.203097639603264,42.459441175790076",
            bLng: "-83.25866010742186,-82.83293989257811",
            sort: "severity_priority asc"
        }).then(makeUrl).then(rp).then(convertToXml).then(extractInfo).then(res.send.bind(res));

    })

app.listen(3000);