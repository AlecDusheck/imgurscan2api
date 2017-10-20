var express = require('express');
var router = express.Router();
var sanitize = require('mongo-sanitize');

var Query = require('../models/imgurQuery');

/* POST getResults page. */
router.post('/', function (req, res, next) {

    Query.findOne({
            queryID: sanitize(req.body.queryID)
        },
        '-_id -__v'
        , function (err, ImgurQueries) {
            if (err) throw err;
            if (!ImgurQueries) {
                res.json({success: false, message: 'Invalid queryID.'});
            } else if (ImgurQueries) {
                res.json(ImgurQueries);
            }
        });


});
module.exports = router;
