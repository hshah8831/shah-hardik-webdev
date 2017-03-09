var mongoose = require("mongoose");
var WebsiteSchema = require("../website/website.schema.server.js")();
var UserSchema = mongoose.Schema({
    username:  String,
    password:  String,
    firstname: String,
    lastname:  String,
    email:     String,
    phone:     String,
    websites:  [WebsiteSchema],
    dateCreated: {type: Date, default: Date.now}
});

module.exports = UserSchema;