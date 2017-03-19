var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username:  String,
    password:  String,
    firstname: String,
    lastname:  String,
    email:     String,
    phone:     String,
    websites:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Website'
    }],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'user'});

module.exports = UserSchema;