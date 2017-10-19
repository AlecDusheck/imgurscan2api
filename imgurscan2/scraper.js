var request = require("request");

var imgurQuery   = require('../models/imgurQuery');

module.exports = {
    scraper: function (queryID) {
        var requestLoop = setInterval(function () {
            getUrl(function (results) {
                console.log("GENERATED LINK FOR " + queryID + " (" + results + ").");
            });
        }, 500);
    }
};

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
