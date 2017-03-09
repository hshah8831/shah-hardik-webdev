module.exports = function (app, model) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice_wonder@yomail.com"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob_marley@yomail.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly_garcia@yomail.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose_annunzi@yomail.com" }
    ];

    function createUser(req, res){
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.json(user);
        return;
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
            for(var u in users) {
                var user = users[u];
                if( user.username === username ) {
                    res.json(user);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }

    function findUserById(req, res) {
        var uid = req.params.userId;
        if(uid){
            for(var u in users) {
                var user = users[u];
                if( user._id == uid ) {
                    res.json(user);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users) {
            var user = users[u];
            if( user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
        return null;
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        if(user && userId){
            for(var u in users) {
                if( users[u]._id == userId ) {
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].email = user.email;
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        if(userId){
            for(var u in users) {
                if( users[u]._id == userId ) {
                    users.splice(u,1);
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }
}