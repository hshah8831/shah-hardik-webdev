(function(){
    angular
        .module("WebAppMaker")
        .factory('WidgetService', widgetService);

    function widgetService() {
        var widgets = [
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget
        };
        return api;

        function createWidget(widget){
            widget._id = (new Date()).getTime();
            widgets.push(widget);
            return widget
        }

        function findWidgetsByPageId(pid) {
            ret_widgets=[]
            for(var w in widgets){
                if(widgets[w].pageId == pid){
                    ret_widgets.push(widgets[w]);
                }
            }
            return ret_widgets;
        }

        function findWidgetById(wgid) {
            for(var w in widgets) {
                if( widgets[w]._id == wgid ) {
                    return widgets[w];
                }
            }
            return null;
        }

        function updateWidget(wgid, widget) {
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
                    return widgets[w];
                }
            }
            return null;
        }

        function deleteWidget(wgid) {
            for(var w in widgets) {
                if( widgets[w]._id == wgid ) {
                    var widget = widgets[w];
                    widgets.splice(w,1);
                    return widget;
                }
            }
            return null;
        }
    }
})();