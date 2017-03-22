module.exports = function (app, model) {
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
}