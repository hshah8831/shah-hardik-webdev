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
        page.websiteId = req.params.websiteId;
        page._id = (new Date()).getTime();
        pages.push(page);
        res.json(page);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        var ret_pages = [];
        if(wid){
            for(var p in pages){
                var page = pages[p];
                if(page.websiteId == wid){
                    ret_pages.push(page);
                }
            }
        }
        res.json(ret_pages);
        return;
    }
    
    function findPageById(req, res) {
        var pid = req.params.pageId;
        if(pid){
            for(var p in pages){
                var page = pages[p];
                if(page._id == pid){
                    res.json(page);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return
    }

    function updatePage(req, res) {
        var pid = req.params.pageId;
        var page = req.body;
        if(pid && page){
            for(var p in pages) {
                if( pages[p]._id == pid ) {
                    pages[p].name=page.name;
                    pages[p].description=page.description;
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }

    function deletePage(req, res) {
        var pid = req.params.pageId;
        if(pid){
            for(var p in pages) {
                if( pages[p]._id == pid ) {
                    pages.splice(p,1);
                    res.sendStatus(200);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }
};