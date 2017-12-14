#!/usr/bin/env node

/**
 * Auth Module.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var verifyToken = require('../index');

var app = express();
var index = express.Router();
var testRoutes = express.Router();

var jwtsecret = require('../config').jwtsecret;


var user = {
    username: 'doe',
    password: 'password',
    admin: false,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);

index.get('/', function(req, res) {
    res.json("Test page");
});

index.get('/gettoken', function(req, res) {
    const payload = {
        username: user.username,
        admin: user.admin
    };

    var token = jwt.sign(payload, jwtsecret, {
        expiresIn: 60*60*24 // expires in 24 hours
    });

    res.json({
        success: true,
        title: 'JWT Token',
        description: "Token received.",
        token: token
    });
});

app.use('/test', testRoutes);

testRoutes.use(verifyToken());

testRoutes.get('/', function(req, res) {
    res.json(req.decoded);
});

module.exports = app;
