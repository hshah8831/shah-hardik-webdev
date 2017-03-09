var mongoose = require("mongoose");

var YoutubeSchema = mongoose.Schema({
    url:          String,
    width:        Number
});

module.exports = YoutubeSchema;