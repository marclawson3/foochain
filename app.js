﻿'use strict';
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser')

// Initialize the app
const app = express();
require('dotenv').config();
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// Initialize blockchain
const Blockchain = require("./blockchain/Blockchain");
let fooChain = new Blockchain;
module.exports = fooChain;


// Initialize routes
const routes = require('./routes/index');
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('foochain listening on port ' + server.address().port);
});