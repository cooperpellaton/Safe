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
// const sass = require('node-sass-middleware');
// const multer = require('multer');
// const upload = multer({ dest: path.join(__dirname, 'uploads') });
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({
    path: '.env'
});
/**
 * Controllers (route handlers).
 */
// const homeController = require('./controllers/home');
// const userController = require('./controllers/user');
// const apiController = require('./controllers/api');
// const contactController = require('./controllers/contact');
/**
 * Create Express server.
 */
const app = express();
/**
 * Connect to MongoDB.
 */
var db = new Db('stops', new Server('localhost', 27017));
mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
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
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
// app.use(sass({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public')
// }));
app.use(logger('dev'));
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

var promiseMongo = Promise.promisifyAll(MongoDB);

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
    }).then(function(contents){
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