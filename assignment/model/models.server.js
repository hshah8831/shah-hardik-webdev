module.exports = function() {

    var connectionString = 'mongodb://127.0.0.1:27017/webappmaker';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.createConnection(connectionString);


    //var mongoose = require("mongoose");

    //mongoose.createConnection('mongodb://127.0.0.1:27017/webappmaker');

    //Get the default connection
    var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));


    var model = {
        userModel       : require("./user/user.model.server.js")(),
        websiteModel    : require("./website/website.model.server.js")(),
        pageModel       : require("./page/page.model.server.js")(),
        widgetModel     : require("./widget/widget.model.server.js")(),
    };
    return model;
}
