var expect = require('chai').expect;
var request = require('request');
var app = require('./server');
var http = require('http');



app.set('port', process.env.DBWEBB_PORT || 3050);


//server = app.listen(app.get('port'));

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});