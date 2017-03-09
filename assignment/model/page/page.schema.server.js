var mongoose = require("mongoose");
var WidgetSchema = require("../widget/widget.schema.server.js")();
var PageSchema = mongoose.Schema({
    _website:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Website'
    },
    name:         String,
    title:        String,
    description:  String,
    widgets:     [WidgetSchema],
    dateCreated: {type: Date, default: Date.now}
});

module.exports = PageSchema;