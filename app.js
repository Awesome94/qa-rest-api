'use strict';

var express = require('express');
var app = express(); 
var routes = require("./routes");
var logger = require('morgan')
var mongoose = require('mongoose')

var jsonParser = require("body-parser").json;

app.use(logger);

mongoose.connect('mongodb:localhost://27017/qa');

var db = mongoose.connection;

db.on('error', function(err){
    console.log("this is error", err);
})

db.once('open', function(){
    console.log("db connection successful");
})

app.use('/questions', routes);

app.use(jsonParser())

//catch 404 and forward to the error handler.
app.use(function(req, res, next){
    var err = new Error("Not found")
    err.status  = 404;
    next(err)
})

//error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        error: {
       message: error.message 
        }
    })
})

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("express server is listening on PORT", port);
});

