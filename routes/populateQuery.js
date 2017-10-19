var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
var async = require('async');

var User = require('../models/apiUser');
var Query = require('../models/imgurQuery');

/* GET populateQuery page. */
router.get('/', function (req, res, next) {

    generateValidID(function (results) {
        var query = new Query({
            queryID: results,
            numberOfImages: 20,
            issuedAt: new Date()
        });

        // save the sample user
        query.save(function(err) {
            if (err) throw err;
            var scraper = require('../imgurscan2/scraper');
            scraper.scraper(results);
            res.json({success: true, message: 'Created query with id ' + results, queryid: results});
        });
    });
});

function generateValidID(callback) {
    var canidateUuid = uuid();
    Query.findOne({
        queryID: canidateUuid
    }, function (err, ImgurQueries) {
        if (err) throw err;
        if (!ImgurQueries) {
            console.log('done' + canidateUuid);
            console.log('lol2');
            callback(canidateUuid)
        } else if (ImgurQueries) {
            return generateValidID();
        }
    });
}

module.exports = router;
