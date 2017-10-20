var express = require('express');
var router = express.Router();

var imgurQuery = require('../models/imgurQuery');


/* GET home page. */
router.post('/', function (req, res, next) {

    imgurQuery.remove({
        queryID: req.body.queryID
    }, function (err, user) {
        if (err) throw err;
        if (!imgurQuery) {
            res.json({success: false, message: 'Nothing removed.'});
        } else if (imgurQuery) {
            res.json({success: false, message: 'Removed.'});
        }
    });

    /*
    // create a sample user
    var nick = new User({
        name: 'alec',
        apiToken: 'alec112233',
        admin: true
    });

    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
    */
});

module.exports = router;
