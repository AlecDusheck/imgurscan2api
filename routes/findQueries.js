var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;

var Query   = require('../models/imgurQuery');


/* GET home page. */
router.get('/', function(req, res, next) {
    Query.find({}, function(err, users) {
        res.json(users);
    });
});

module.exports = router;
