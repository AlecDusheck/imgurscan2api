var express = require('express');
var router = express.Router();

var User   = require('../models/apiUser');

/* GET home page. */
router.get('/', function (req, res, next) {
    User.findOne({
        name: req.body.name
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
                var token = jwt.sign(payload, app.get('tokenCreation'), {
                    expiresInMinutes: 1440
                });
                res.json({
                    success: true,
                    message: 'Token create. Valid for 24 hours.',
                    token: token
                });
            }
        }
    });
});

module.exports = router;
