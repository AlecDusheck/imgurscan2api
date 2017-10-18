var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
    var url = 'mongodb://localhost:27017/imgurscan';
    mongodb.connect(url, function (err, db) {
        var collection = db.collection('storiedQueries');

    });



    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
});

module.exports = router;
