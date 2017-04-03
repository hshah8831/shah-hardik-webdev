var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session      = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({   secret: "secret",
                    resave: false,
                    saveUninitialized: false}));
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require("./assignment/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);