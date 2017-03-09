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
        website.developerId = req.params.userId;
        website._id = (new Date()).getTime();
        websites.push(website);
        res.json(website);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for(var w in websites) {
            if(websites[w].developerId == userId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        if(wid){
            for(var w in websites) {
                if( websites[w]._id == wid) {
                    res.json(websites[w]);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }

    function updateWebsite(req, res) {
        var wid = req.params.websiteId;
        var website = req.body;
        if(wid && website){
            for(var w in websites) {
                if( websites[w]._id == wid ) {
                    websites[w].description=website.description;
                    websites[w].name=website.name;
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }

    function deleteWebsite(req, res) {
        var wid = req.params.websiteId;
        for(var w in websites) {
            if( websites[w]._id == wid ) {
                websites.splice(w,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404)
        return;
    }
};