var express = require('express');
var router = express.Router();

var Query = require('../models/imgurQuery');


/* GET home page. */
router.get('/', function (req, res, next) {
    Query.find({}, function (err, ImgurQueries) {
        res.json(users);
    });
});

module.exports = router;
