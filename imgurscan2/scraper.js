// ======================================================
// =                                                    =
// =                                                    =
// =                                                    =
// =                                                    =
// =                 (c) simplyalec                     =
// =                                                    =
// =                                                    =
// =                                                    =
// =                                                    =
// =                                                    =
// ======================================================

var request = require("request");

var imgurQuery = require('../app/models/imgurQuery');

module.exports = {

    /**
     * Main scraper function.
     * @param queryID
     */

    scraper: function (queryID) {
        //This loop will fire every half second. It will stop once all the queries are complected.
        var requestLoop = setInterval(function () {
            //Find valid URL and fire callback
            getUrl(function (results) {
                imgurQuery.findOne({
                    queryID: queryID
                }, function (err, ImgurQueries) {
                    if (err) throw err;
                    if (!ImgurQueries) {
                        //If the query dosen't exist (for some reason), cancel loop.
                        clearInterval(requestLoop);
                    } else if (ImgurQueries) {
                        //Create an array from the JSON in the database. Then, add the new found link to the object.
                        var obj = JSON.parse(ImgurQueries.results);
                        obj['queries'].push({link: results});
                        var query = {queryID: queryID};
                        //Update the database and check if we have finished. If not, redo this.
                        imgurQuery.update(query, {results: JSON.stringify(obj)}, function (err) {
                            if (err) return console.error(err);
                            if (obj.queries.length > ImgurQueries.numberOfImages) {
                                clearInterval(requestLoop);
                            }
                        })
                    }
                });
            });
        }, 500);
    }
};

/**
 * Gets a valid url and fires callback with result.
 * @param callback
 */
function getUrl(callback) {
    var rnd = rndUrl();
    request({
        uri: "https://imgur.com/a/" + rnd
    }, function (error, response, body) {
        if (!body.toString().includes("404") && !body.toString().includes("https://i.imgur.com/.jpg")) {
            callback("https://imgur.com/a/" + rnd);
        }
    });
}

function rndUrl() {
    var text = "";
    for (var i = 0; i < 5; i++)
        text += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 52));
    return text;
}
