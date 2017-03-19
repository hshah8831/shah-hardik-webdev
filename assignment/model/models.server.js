module.exports = function() {

    var mongoose = require("mongoose");

    mongoose.createConnection('mongodb://127.0.0.1:27017/webappmaker');

    //Get the default connection
    var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));


    var model = {
        userModel       : require("./user/user.model.server.js")(),
        websiteModel    : require("./website/website.model.server.js")(),
        pageModel       : require("./page/page.model.server.js")(),
        widgetMode      : require("./widget/widget.model.server.js")(),
    };
    return model;
}
