var mongoose = require("mongoose");
var TextInputSchema = require("./textinput.schema.server.js")();
var ImageSchema  = require("./image.schema.server.js")();
var HeaderSchema = require("./header.schema.server.js")();
var YouTubeSchema   = require("./youtube.schema.server.js")();
var HtmlSchema      = require("./html.schema.server.js")();

var WidgetSchema = mongoose.Schema({
    _page:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    widgetType: {type: String, enum: ["HTML", "HEADER", "INPUT", "IMAGE", "YOUTUBE"]},
    name      : String,
    title     : String,
    text      : {type:String, default:'Text'},
    html      : HtmlSchema,
    youTube   : YouTubeSchema,
    header    : HeaderSchema,
    textInput : TextInputSchema,
    image     : ImageSchema,
    deletable : Boolean,
    index     : Number,
    dateCreated: {type: Date, default: Date.now}
});

module.exports = WidgetSchema;