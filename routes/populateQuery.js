var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
var async = require('async');

var User = require('../models/apiUser');
var Query = require('../models/imgurQuery');

/* POST populateQuery page. */
router.post('/', function (req, res, next) {

    if (req.body.numOfImages <= parseInt(req.app.get("maxNumberOfQueries"))) {
        generateValidID(function (results) {
            var query = new Query({
                queryID: results,
                numberOfImages: req.body.numOfImages,
                issuedAt: new Date(),
                results: JSON.stringify({"queries":[]})
            });

            // save the sample user
            query.save(function (err) {
                if (err) throw err;
                var scraper = require('../imgurscan2/scraper');
                scraper.scraper(results);
                res.json({success: true, message: 'Created query with id ' + results, queryid: results});
            });
        });
    }else{
        res.json({success: false, message: 'Your requesting too many images to be queried.'});
    }
});

function generateValidID(callback) {
    var canidateUuid = uuid();
    Query.findOne({
        queryID: canidateUuid
    }, function (err, ImgurQueries) {
        if (err) throw err;
        if (!ImgurQueries) {
            callback(canidateUuid)
        } else if (ImgurQueries) {
            return generateValidID();
        }
    });
}

module.exports = router;
