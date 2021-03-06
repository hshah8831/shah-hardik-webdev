module.exports= function (app, model) {
    app.put("/api/page/:pageId/widget", changeIndex);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('file'), uploadImage);

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;

        if(pageId && widget){
            var createWidgetPromise = model.widgetModel.createWidget(pageId, widget);
            var fetchpagePromise = model.pageModel.findPageById(pageId);

            Promise.all([
                createWidgetPromise,
                fetchpagePromise
            ]).then(
                function (values){
                    var widget = values[0];
                    var page = values[1];
                    page.widgets.push(widget._id);
                    model
                        .pageModel
                        .updatePage(pageId, page)
                        .then(function (result) {
                            res.json(widget);
                        }, function (err) {
                            res.send(500).send(err);
                        });
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
        } else {
            res.send(404);
        }
    }
    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pageId;
        if(pid){
            model
                .widgetModel
                .findAllWidgetsForPage(pid)
                .then(function (widgets) {
                    res.json(widgets);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        } else {
            res.send(404);
        }
    }
    function findWidgetById(req, res) {
        var wgid = req.params.widgetId;
        if(wgid){
            model
                .widgetModel
                .findWidgetById(wgid)
                .then(function (widget) {
                    res.json(widget);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        } else {
            res.send(404);
        }
    }
    function updateWidget(req, res) {
        var wgid = req.params.widgetId;
        var widget = req.body;
        if(wgid && widget){
            model
                .widgetModel
                .updateWidget(wgid, widget)
                .then(function (result) {
                    res.json(result);
                }, function (err) {
                    res.status(500).send(err);
                });
        } else {
            res.send(404);
        }
    }
    function deleteWidget(req, res) {
        var wgid = req.params.widgetId;
        if(wgid){
            model
                .widgetModel
                .deleteWidget(wgid)
                .then(function (result) {
                    res.json(result);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        } else {
            res.send(404);
        }
    }

    function changeIndex(req, res) {
        var start = req.query["initial"];
        var stop = req.query["final"];
        var pid = req.params.pageId;
        if(start && stop && pid){
            model
                .widgetModel
                .reorderWidget(pid, start, stop)
                .then(function (result) {
                    res.send(200);
                }, function (err) {
                    res.send(500).send(err);
                })
        } else {
            res.send(404);
        }
    }

    function uploadImage(req, res) {
        var widget      = JSON.parse(req.body.data);
        var myFile        = req.file;
        var wgid = widget._id;
        wigdet.image.url = "http://"+ req.rawHeaders[1]+"/uploads/"+ myFile.filename;

        if(wgid && myFile){
            model
                .widgetModel
                .updateWidget(wgid, widget)
                .then(function (result) {
                    res.send(200);
                }, function (err) {
                    res.send(500).send(err)
                })
        }
        res.sendStatus(404);
        return;
    }
};