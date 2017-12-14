var jwt = require('jsonwebtoken');
var jwtsecret = require('./config').jwtsecret; // config for jwtsecret

/**
 * Middleware for verifying JWT tokens
 *
 * Using the jsonwebtoken-library, available options can be found here:
 * https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
 *
 * @param {*} options - Options
 *
 * @return error or next()
 */
module.exports = function(options = {}) {
    return (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) {
            return res.status(403).send({
                success: false,
                status: 403,
                title: 'NoTokenProvided',
                description: "Forbidden, missing token."
            });
        }

        jwt.verify(token, jwtsecret, options, (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    success: false,
                    status: 403,
                    title: err.name,
                    description: `Forbidden. ${err.message}`

                });
            }

            req.decoded = decoded;
            next();
        });
    };
};
