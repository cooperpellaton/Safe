/**
 * Module dependencies.
 */
var Promise = require('bluebird');
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
const logger = require('morgan');
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
var db = new Db('stops', new Server('localhost', 27017));
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
/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email', 'user_location']
}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect(req.session.returnTo || '/');
});
/**
 * Defining my primary routes here.
 */
app.post('/location/', function(req, res) {
    console.log(req.body); //should be JSON
    res.send(distSort(req.body));
});
var promiseMongo = Promise.promisifyAll(Db);
// var stopsPromise = new Promise(function(resolve, reject){
//     db.open(function(err, db) {
//         var collection = db.collection('stops');
//         collection.find()
//         resolve
//     });   
// }).then(function(collection){
//     return (collection.find());
// });
var distSort = function calculateDistance(location) {
    var distanceList = [];
    db.open(function(err, db) {
        var collection = db.collection('stops');
        collection.find()
    }).then(function(contents) {
        console.log(contents);
        for (stop in contents) {
            var object = [stop[1], stop[2]];
            distanceList.push(stop[0], distance(object, location));
        }
        var sortedVals = function getSortedKeys(distanceList) {
            var keys = [];
            for (var key in obj) keys.push(key);
            return keys.sort(function(a, b) {
                return obj[a] - obj[b]
            });
        }
        return sortedVals;
    });
    // Promise.props({
    //     stops : stopsPromise
    // }).then(function(result){
    //     console.log(result.stops);
    //     for (stop in stops) {
    //         var object = [stop[1], stop[2]];
    //         distanceList.push(stop[0], distance(object, location));
    //     }
    //     var sortedVals = function getSortedKeys(distanceList) {
    //         var keys = [];
    //         for (var key in obj) keys.push(key);
    //         return keys.sort(function(a, b) {
    //             return obj[a] - obj[b]
    //         });
    //     }
    //     return sortedVals;
    // });
};
/**
 * This function takes in as a POST the stop that the user is electing to go 
 * to. Using this information the Detroit DOT API is queried for the nearest 
 * bus to that location and the time to arrival is returned. If no such bus is 
 * found going to that stop, false is returned.
 * A sample input: 
 * { "_id" : ObjectId("57f88ec38d06beec95fbf2f1"), "stop_name" : "Harper & 
 * Conner", "stop_lat" : 42.397106, "stop_lon" :-82.989298 }
 */
app.post("/api/nextBus", function(req, res) {
    var requestURL = "https://ddot-beta.herokuapp.com/api/api/where/vehicles-for-agency/DDOT.json?key=LIVEMAP";
    var returnedJSON = http.request(requestURL, callback).end();
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
    var xml = http.request(requestURL)
    console.log(xml);
    var jsonTrafficData = makeMeSomeJSON(xml);
    console.log(jsonTrafficData);
    var returnResponse = [];
    returnResponse.push(jsonTrafficData["location"]);
    returnResponse.push(jsonTrafficData["title"]);
    returnResponse.push(jsonTrafficData["description"]);
    console.log(returnResponse);
    res.send(returnResponse);
});

var makeMeSomeJSON = function(req, res){
    var jsonTrafficData;
    parseString(req, function(err, result) {
        jsonTrafficData = JSON.stringify(result);
    });
    return jsonTrafficData;
};

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