var mongoose = require("mongoose");

var ImageSchema = mongoose.Schema({
    url:         String,
    width:       Number
});

module.exports = ImageSchema;