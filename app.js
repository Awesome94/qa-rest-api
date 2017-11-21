'use strict';

var express = require('express');
var app = express(); 
var routes = require("./routes");

var jsonParser = require("body-parser").json;

app.use('/questions', routes);

app.use(jsonParser())

app.use('/', function(req, res, next){
    next();
})

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("express server is listening on PORT", port);
});

