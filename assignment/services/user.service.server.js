module.exports = function (app, model) {
    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    app.use(passport.initialize());
    app.use(passport.session());
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : "422362811471460",
        clientSecret : "a69fa5cec686fd3ccac255b2b6552923",
        callbackURL  : "http://www.localhost:3000/auth/facebook/callback",
        enableProof: true
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    app.post('/api/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { session: false, scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {   successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));
    app.get('/api/loggedin', loggedin);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res){
        var user = req.body;
        model.userModel.createUser(user).then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(500).send(err);
        })
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        if(username){
            model
                .userModel
                .findUserByUsername(username)
                .then(function (user) {
                    res.json(user);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
       } else {
            res.sendStatus(404);
        }
    }

    function findUserById(req, res) {
        var uid = req.params.userId;
        if(uid){
            model
                .userModel
                .findUserById(uid)
                .then(function (user) {
                    res.json(user);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        if(user && userId){
            model
                .userModel
                .updateUser(userId, user)
                .then(function (user) {
                    res.send(200);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        } else {
            res.sendStatus(404);
        }
        return;
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        if(userId){
            model
                .userModel
                .deleteUser(userId)
                .then(function (user) {
                    res.send(200);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        } else {
            res.sendStatus(404);
        }
        return;
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.userModel
            .createUser(user)
            .then(function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }

    function localStrategy(username, password, done) {
        model.userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    user = user[0];
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if(user) {
                    return done(null, user);
                } else {
                    var nameList = profile.displayName.split(" ")
                    var firstname = nameList[0];
                    var lastname = nameList[nameList.length-1];
                    var newUser = {
                        username:  firstname,
                        firstname: firstname,
                        lastname:  lastname,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    model.userModel.createUser(newUser).then(function(user){
                            return done(null, user);
                        },function(err){
                            return done(err);
                        }
                    );
                }
            },function(err) {
                if (err) { return done(err); }
            });

    }
}