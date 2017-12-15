/**
 * Tests for middleware
 */
var expect = require('chai').expect;
var request = require('request');
var app = require('./server');

var server;
const url = 'http://localhost:' + app.get('port')

app.set('port', process.env.DBWEBB_PORT || 3052);

var errorNoTokenProvided = JSON.stringify({
    "success": false,
    "status": 403,
    "title": "NoTokenProvided",
    "description": "Forbidden, missing token."
});

var errorJsonWebTokenError = JSON.stringify({
    "success": false,
    "status": 403,
    "title": "JsonWebTokenError",
    "description": "Forbidden. invalid token"
});

describe('Test open and closed routes', function () {
    before(function () {
        server = app.listen(app.get('port'));
    });

    it('/ should return status 200', function (done) {
        request.get(url, function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it('/gettoken should return status 200', function (done) {
        request.get(url + '/gettoken', function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it('/test should return status 403 and NoToken-error', function (done) {
        request.get(url + '/test', function (err, res, body) {
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.deep.equal(errorNoTokenProvided);
            done();
        });
    });

    it('/test?token=1.1.1 should return status 403 and JsonWebTokenError', function (done) {
        request.get(url + '/test?token=1.1.1', function (err, res, body) {
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.deep.equal(errorJsonWebTokenError);
            done();
        });
    });


    after(function () {
        server.close();
    });
});

var tokenBody;

describe('Test JWT', function () {
    before(function () {
        server = app.listen(app.get('port'));
    });

    it('expect statuscode 200 when using the created token', function (done) {
        request.get(url + '/gettoken', function (err, res, body) {
            request.get(url + '/test?token=1.1.1', function (err, res, body) {
                expect(res.statusCode).to.equal(403);
            });

            request.get(url + '/test?token=' + JSON.parse(res.body).token, function (err, res, body) {
                expect(res.statusCode).to.equal(200);
                expect(JSON.parse(res.body).username).to.equal('doe');
                done();
            });
        });
    });

    after(function () {
        server.close();
    });
});
