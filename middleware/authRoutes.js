var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['simplyalec-access-token'];
    if (token) {
        jwt.verify(token, req.app.get('tokenCreation'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Invalid or expired token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'Please create a token with the auth page.'
        });

    }
});
module.exports = router;