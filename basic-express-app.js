const path = require('path');
const express = require('express');
var app = express();

app.use('/client/compiled', express.static(path.resolve('client/compiled')));

app.get('/', function(req,res){
    res.sendFile(path.resolve('index.html'));
});

app.post('/api/trafficData', function(req,res){
    console.log(req);
    res.status(200).send();
});

app.listen(3000);