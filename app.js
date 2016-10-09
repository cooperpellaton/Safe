/**
 * Module dependencies.
 */
const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec,child;
var Promise = require('bluebird');
var rp = require('request-promise');
var request = require('request');
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    // BSON = require('mongodb').pure().BSON,
    assert = require('assert');
const express = require('express');
var http = require('http');
var parseString = require('xml2js').parseString;
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
var geoTools = require('geo-tools');
var querystring = require('querystring');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({
    path: '.env'
});
/**
 * Create Express server.
 */
const app = express();
/**
 * Connect to MongoDB.
 */
var db = new Db('stops', new Server('50.116.48.206', 27017));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/stops');
mongoose.connection.on('connected', () => {
    console.log('%s MongoDB connection established!', chalk.green('✓'));
});
mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});
var stopSchema = new mongoose.Schema({
    stop_name: String,
    stop_lat: String,
    stop_lon: String
});
var Stops = mongoose.model('Stops', stopSchema);
var rateSchema = new mongoose.Schema({
    location: [Number, Number],
    rate: Number
});
var ratesModel = mongoose.model('Rates', rateSchema);
var commentSchema = new mongoose.Schema({
    location: [Number, Number],
    comment: String
});
var commentsModel = mongoose.model('Comments', commentSchema);
/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.use(expressStatusMonitor());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(function(req, res, next) {
    // After successful login, redirect back to the intended page
    if (!req.user && req.path !== '/login' && req.path !== '/signup' && !req.path.match(/^\/auth/) && !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    }
    next();
});
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 31557600000
}));

/*
 *
 */
app.post("/api/doSomeML", function(req, res) {
        console.log(req.body);
        var d = new Date();
        var hour = d.getHours();
        child = exec('python python/ml_risk.py ' + hour + ' ' + req.body['visibility'], function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
        child = exec('python python/ml_danger.py ' + req.body['lat'] + ' ' + req.body['long'] + ' ' + hour, function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
        var content1 = fs.readFileSync('risk.dat', 'utf8');
        var content2 = fs.readFileSync('danger.dat', 'utf8');
        console.log("Content of Risk: " + content1);
        console.log("Content of Danger: " + content2);
        var jsonResp = {"risk": content1, "danger": content2};
        res.setHeader('content-type', 'text/javascript');
        res.send(JSON.stringify(jsonResp));
    })
    /**
     * This function takes in as a POST the stop that the user is electing to go 
     * to. Using this information the Detroit DOT API is queried for the nearest 
     * bus to that location and the time to arrival is returned. If no such bus is 
     * found going to that stop, false is returned.
     * A sample input: 
     * { "_id" : ObjectId("57f88ec38d06beec95fbf2f1"), "stop_name" : "Harper & 
     * Conner", "stop_lat" : 42.397106, "stop_lon" :-82.989298 }
     */

var checkBuses = function(data) {
    bus_element = data["routes"]["legs"]["steps"];
    bus_found = false;
    for (var i = 0; i < bus_element.length; i++) {
        e = bus_element[i];
        if (e['travel_mode'] == 'TRANSIT' && e['line']['type'] == 'BUS') {
            bus_element = e;
            return true;
        }
    }
}

var getTime = function(data) {
    /** Remaining time **/
    var requestURL = "https://ddot-beta.herokuapp.com/api/api/where/vehicles-for-agency/DDOT.json?key=LIVEMAP";
    var returnedJSON = request(requestURL, callback);
    var englishStopName = data;
    var stopID = (returnedJSON["data"]["references"]["stops"]["name"]).equals(englishStopName);
    for (bus in returnedJSON["data"]["list"]) {
        if (bus["nextStop"].equals(stopID)) {
            return stop["nextStopTimeOffset"];
        }
    }
}

var extractInfoToo = function(data) {
    if (!busTime.equals(null)) {
        return {
            coordinates: coordinates,
            busTime: busTime,
            f: "waitML2"
        };
    } else {
        return {
            coordinates: coordinates,
            busTime: null,
            f: "waitML2"
        };
    }
};

app.post("/api/nextBus", function(req, res) {
    /*
     * req.body = [[lat, long], [lat, long]]
     */
    var coordinates = Promise.props({
        origin: "" + req.body["from"][0] + "," + req.body["from"][1],
        destiniation: "" + req.body["to"][0] + "," + req.body["to"][1]
    }).then((params) => `https://maps.googleapis.com/maps/api/directions/json?&mode=transit&origin=${params.origin}destination=${params.destination}&key=AIzaSyBLyhBEBnRBD5nFdu4Blw5k7IKYFV59MI0`).then(rp).then(JSON.parse).then(checkBuses);
    var busTime = Promise.props({
        englishStopName: req.body["stop_name"]
    }).then(getTime);
    Promise.props({
        coordinates: coordinates,
        busTime: busTime
    }).then(extractInfoToo).then(res.send.bind(res));
});
/**
 * This route will order an uber for the user. It assumes that the location is 
 * posted to the route in the format {[LAT, LONG],[LAT, LONG]}.
 */
app.post("/api/orderUber", function(req, res) {
    var uberURLCall = "uber://?client_id=cCpG5qtrxGxCzApGenztSMTYhqE_yirV&action=setPickup&pickup[latitude]=" + req.body[1]["lat"] + "&pickup[longitude]=" + req.body[1]["long"] + "&dropoff[latitude]=" + req.body[2]["lat"] + "&dropoff[longitude]=" + req.body[2]["long"];
    res.send(request.get(uberURLCall));
});
app.post("/api/putRate", function(req, res) {
    var lng = req.body["lng"];
    var lat = req.body["lat"];
    console.log("LAT" + req.body["lat"]);
    var rate = req.body["rate"];
    console.log(req.body);
    var location = [lat, lng];
    if (rate > 0) db.collection("Rates").insert({
        location: location,
        rate: rate
    });
    res.send("successful");
});
app.get("/api/getRate", function(req, res) {
    var allRates = db.collection("Rates").find();
    var val = Math.floor(0 + Math.random() * 6);
    console.log(val);
    res.send(String(val));
    // var myDocument = allRates.hasNext() ? allRates.next() : null;
    // var total = 0;
    // var count = 0;
    // if(myDocument){
    //     console.log("Current Rate: " + myDocument.rate);
    //     console.log("Current Rate repped as array: " + myDocument["rate"])
    //     total += myDocument.rate
    //     count++;
    // }
    // var average = (total/count);
    // res.send({"average" : average});
});
app.post("/api/putComment", function(req, res) {
    var lng = req.body["lng"];
    var lat = req.body["lat"];
    var comment = req.body["comment"];
    console.log(req.body);
    var location = [lat, lng];
    if (comment.length > 5) db.collection("Comments").insert({
        location: location,
        comment: comment
    });
    res.send("successful");
});
app.get("/api/getComment", function(req, res) {
    var comment = db.collection("Rates").findOne({});
    console.log("Comment for return: " + comment);
    res.send(comment);
});
var convertToXml = Promise.promisify(parseString);
var extractInfo = function(data) {
    var measurments = data.visibility.hourly.data.map((hour) => hour.visibility);
    var visibility = measurments.reduce(function(sum, a) {
        return sum + a
    }, 0) / (measurments.length || 1) * 0.4;
    if (data.traffic.CCTraffic.location) {
        return {
            title: data.traffic.CCTraffic.location[0].title,
            description: data.traffic.CCTraffic.location[0].description,
            visibility: visibility,
            f: "waitML"
        };
    } else {
        return {
            title: null,
            description: null,
            visibility: visibility,
            f: "waitML"
        };
    }
};
var makeUrl = function(params) {
    return `http://api.cctraffic.net/feeds/map/Traffic.aspx?${querystring.stringify(params)}`;
};
app.post("/api/trafficData", function(req, res) {
    console.log(req.body);
    var traffic = Promise.props({
        id: 17,
        type: "incident,event",
        max: 25,
        bLat: "42.203097639603264,42.459441175790076",
        bLng: "-83.25866010742186,-82.83293989257811",
        sort: "severity_priority asc"
    }).then((params) => `http://api.cctraffic.net/feeds/map/Traffic.aspx?${querystring.stringify(params)}`).then(rp).then(convertToXml);
    var visibility = Promise.props({
        latitude: req.body["from"][0],
        longitude: req.body["from"][1]
    }).then((params) => `https://api.darksky.net/forecast/dc0b864eaf08e3073401662ab0a3b463/${params.latitude},${params.longitude}`).then(rp).then(JSON.parse)
    Promise.props({
        traffic: traffic,
        visibility: visibility
    }).then(extractInfo).then(res.send.bind(res));
});
/**
 * Error Handler.
 */
app.use(errorHandler());
/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});
module.exports = app;