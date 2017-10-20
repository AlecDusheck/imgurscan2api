var express = require('express');
var router = express.Router();

var User = require('../models/imgurQuery');


/* GET home page. */
router.get('/', function (req, res, next) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

module.exports = router;
