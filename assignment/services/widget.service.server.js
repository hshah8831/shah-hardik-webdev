module.exports= function (app) {
    app.put("/api/page/:pageId/widget", changeIndex);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);


    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO" , "index" : 0},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "index" : 1},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "index" : 2},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "index" : 3},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "index" : 4},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "index" : 5 },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "index" : 6}
    ];

    function createWidget(req, res) {
        var widget = req.body;
        widget._id = (new Date()).getTime();
        widgets.push(widget);
        res.json(widget);
    }
    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pageId;
        var ret_widgets=[];
        if(pid){
            for(var w in widgets){
                if(widgets[w].pageId == pid){
                    ret_widgets.push(widgets[w]);
                }
            }
        }
        res.json(ret_widgets);
        return;
    }
    function findWidgetById(req, res) {
        var wgid = req.params.widgetId;
        if(wgid){
            for(var w in widgets) {
                if( widgets[w]._id == wgid ) {
                    res.json(widgets[w]);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }
    function updateWidget(req, res) {
        var wgid = req.params.widgetId;
        var widget = req.body;
        if(wgid && widget){
            for(var w in widgets) {
                if( widgets[w]._id == wgid ) {
                    if(widget.widgetType == "HEADER"){
                        widgets[w].size=widget.size;
                        widgets[w].text=widget.text;
                    } else if(widget.widgetType == "IMAGE" || widget.widgetType == "YOUTUBE"){
                        widgets[w].url=widget.url;
                        widgets[w].width=widget.width;
                    } else if(widget.widgetType == "HTML"){
                        widgets[w].text=widget.text;
                    }
                    res.json(widgets[w]);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }
    function deleteWidget(req, res) {
        var wgid = req.params.widgetId;
        if(wgid){
            for(var w in widgets) {
                if( widgets[w]._id == wgid ) {
                    var widget = widgets[w];
                    widgets.splice(w,1);
                    res.json(widget);
                    return;
                }
            }
        }
        res.sendStatus(404);
        return;
    }

    function changeIndex(req, res) {
        var start = req.query["initial"];
        var stop = req.query["final"];
        var pid = req.params.pageId;
        if(start && stop && pid){
            start=parseInt(start);
            stop=parseInt(stop);
            var mult = -1;
            var curInd=start;
            //if stop is greater than start, all the intermediate widgets would move one step up (-1) else (+1)
            if(start>stop){
                mult = 1;
                curInd=stop;
            }

            for(w in widgets){
                if(pid == widgets[w].pageId){
                    curInd = widgets[w].index;
                    if(mult == 1){
                        if(curInd>=stop && curInd<=start) widgets[w].index+=mult;
                    } else if(mult == -1){
                        if(curInd>=start && curInd<=stop) widgets[w].index+=mult;
                    }
                    if(curInd==start) widgets[w].index=stop;
                    curInd++;
                }
            }
            res.json(widgets);
            return;
        }
        res.sendStatus(404);
        return;
    }
};