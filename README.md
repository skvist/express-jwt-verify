# express-jwt-verify
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/skvist/express-jwt-verify/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/skvist/express-jwt-verify/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/skvist/express-jwt-verify/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/skvist/express-jwt-verify/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/skvist/express-jwt-verify/badges/build.png?b=master)](https://scrutinizer-ci.com/g/skvist/express-jwt-verify/build-status/master)

JSON Web Token middleware for expressJS that verifies that the token is valid.

This is mainly a school assignment at Blekinge Institute of Technology.



### Install

```
npm install express-jwt-verify --save
```

### Usage

```
var jwtMiddleware = require('express-jwt-verify');

var protectedRoutes = express.Router();

app.use('/protected', protectedRoutes);

protectedRoutes.use(jwtMiddleware('mysecret'));

protectedRoutes.get('/decoded', function(req, res) {
    res.json(req.decoded);
});
```
If the verification succeeds it will the pass decoded token with the request (req.decoded) and if it fails it sends a HTTP 403 status and a JSON-body with information.


Theese options can be passed to the verify function:

https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback

```
var jwtMiddleware = require('express-jwt-verify');

protectedRoutes.use(jwtMiddleware('mysecret' , { maxAge: 1000 }));

```