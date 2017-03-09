var mongoose = require("mongoose");

var HeaderSchema = mongoose.Schema({
    text:         String,
    size:         Number
});

module.exports = HeaderSchema;