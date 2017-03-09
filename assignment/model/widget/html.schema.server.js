var mongoose = require("mongoose");

var HtmlSchema = mongoose.Schema({
    text:        String
});

module.exports = HtmlSchema;