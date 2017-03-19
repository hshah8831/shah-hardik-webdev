module.exports= function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];


    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;

        if(website && userId){
            var createWebSitePromise = model.websiteModel.createWebsiteForUser(userId, website);
            var fetchUserPromise = model.userModel.findUserById(userId);

            Promise.all([
                createWebSitePromise,
                fetchUserPromise
            ]).then(
                function (values){
                    var website = values[0];
                    var user = values[1];
                    user.websites.push(website._id);
                    model
                        .userModel
                        .updateUser(userId, user)
                        .then(function (user) {
                            res.json(website);
                        }, function (err) {
                            res.sendStatus(500).send(err);
                        });
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
        } else {
            res.sendStatus(404);
        }
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        if(userId){
            model
                .websiteModel
                .findAllWebsitesForUser(userId)
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.sendStatus(500).send(err);
                })
        } else {
            res.sendStatus(404);
        }
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        if(wid){
            model
                .websiteModel
                .findWebsiteById(wid)
                .then(function (website) {
                    res.json(website);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        } else {
            res.sendStatus(404);
        }
    }

    function updateWebsite(req, res) {
        var wid = req.params.websiteId;
        var website = req.body;
        if(wid && website){
            model
                .websiteModel
                .updateWebsite(wid, website)
                .then(function (website) {
                    res.send(200);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        } else {
            res.sendStatus(404);
        }
    }

    function deleteWebsite(req, res) {
        var wid = req.params.websiteId;
        if(wid){
            model
                .websiteModel
                .deleteWebsite(wid)
                .then(function (result) {
                    res.send(200);
                }, function (err) {
                    res.send(500).send(err);
                });
        } else {
            res.sendStatus(404)
        }
    }
};