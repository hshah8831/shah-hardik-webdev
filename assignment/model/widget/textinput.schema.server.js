var mongoose = require("mongoose");

var TextSchema = mongoose.Schema({
    text:         String,
    placeholder:  String,
    formatted:    Boolean,
    rows:         Number
});

module.exports = TextSchema;
