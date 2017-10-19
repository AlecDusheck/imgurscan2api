var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('ImgurQueries', new Schema({
    queryID: String,
    numberOfImages: Number,
    issuedAt: Date,
    results: String
}));