module.exports = function() {

    var mongoose = require("mongoose");

    mongoose.createConnection('mongodb://localhost/web-app-maker');

    var model = {
        userModel       : require("./user/user.model.server.js")(),
        websiteModel    : require("./website/website.model.server.js")(),
        pageModel       : require("./page/page.model.server.js")(),
        widgetMode      : require("./widget/widget.model.server.js")(),
    };
    return model;
}
