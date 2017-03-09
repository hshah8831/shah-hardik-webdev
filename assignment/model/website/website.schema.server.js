var mongoose = require("mongoose");
var PageSchema = require("../page/page.schema.server.js")();
var WebsiteSchema = mongoose.Schema({
    _user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:         String,
    description:  String,
    pages:        [PageSchema],
    dateCreated:  {type: Date, default: Date.now}
});

module.exports = WebsiteSchema;