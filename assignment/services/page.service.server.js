module.exports= function (app, model) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;

        if(page && websiteId){
            var createPagePromise = model.pageModel.createPage(websiteId, page);
            var fetchWebsitePromise = model.websiteModel.findWebsiteById(websiteId);

            Promise.all([
                createPagePromise,
                fetchWebsitePromise
            ]).then(
                function (values){
                    var page = values[0];
                    var website = values[1];
                    website.pages.push(page._id);
                    model
                        .websiteModel
                        .updateWebsite(websiteId, website)
                        .then(function (website) {
                            res.json(page);
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

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        if(wid){
            model
                .pageModel
                .findAllPagesForWebsite(wid)
                .then(function (pages) {
                    res.json(pages);
                }, function (err) {
                    res.sendStatus(500).send(err);
                })
        } else {
            res.send(404);
        }
    }
    
    function findPageById(req, res) {
        var pid = req.params.pageId;
        if(pid){
            model
                .pageModel
                .findPageById(pid)
                .then(function (page) {
                    res.json(page);
                }, function (err) {
                    res.send(500).send(err);
                })
        } else {
            res.sendStatus(404);
        }
    }

    function updatePage(req, res) {
        var pid = req.params.pageId;
        var page = req.body;
        if(pid && page){
            model
                .pageModel
                .updatePage(pid, page)
                .then(function (result) {
                    res.send(200);
                }, function (err) {
                    res.send(500).send(err);
                });
        } else {
            res.sendStatus(404);
        }
    }

    function deletePage(req, res) {
        var pid = req.params.pageId;
        if(pid){
            model
                .pageModel
                .deletePage(pid)
                .then(function (result) {
                    res.send(200);
                }, function (err) {
                    res.send(500).send(err);
                });
        } else {
            res.sendStatus(404);
        }
    }
};