var request = require("request");

var imgurQuery = require('../app/models/imgurQuery');

module.exports = {
    purge: function (purgeTime) {
        var purgeLoop = setInterval(function () {
            var expiredDate = new Date();
            expiredDate.setMinutes(expiredDate.getMinutes() - purgeTime);
            var matchingQueries = imgurQuery.find({
                issuedAt: {
                    $lt: expiredDate.toISOString()
                }
            });
            imgurQuery.remove(matchingQueries, function (err) {
                if (err) {
                    console.log("Error establishing connection to database! (" + err + ")");
                    process.exit()
                }
            });

        }, 1100);
    }
};