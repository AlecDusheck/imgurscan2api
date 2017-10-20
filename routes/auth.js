var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var sanitize = require('mongo-sanitize');

var User = require('../models/apiUser');

/* POST auth page. */
router.post('/', function (req, res, next) {
    User.findOne({
        name: sanitize(req.body.name)
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
            if (user.apiToken != req.body.apiToken) {
                res.json({success: false, message: 'Invalid API Key.'});
            } else {
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, req.app.get('tokenCreation'), {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    success: true,
                    message: 'Token created. Valid for 24 hours.',
                    token: token
                });
            }
        }
    });
});

module.exports = router;
