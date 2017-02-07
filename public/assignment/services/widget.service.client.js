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

        function createWebsite(website){
            users.push(website);
        }

        function findWidgetsByPageId(pid) {
            for(var w in widgets){
                var widget = widgets[w];
                if(widget.pageId === pid){
                    return widget;
                }
            }
            return null;
        }

        function findWidgetById(wgid) {
            for(var w in widgets) {
                var widget = widgets[w];
                if( widgets._id === wgid ) {
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(wgid, widget) {
            for(var w in widgets) {
                if( widgets[w]._id === wgid ) {
                    websites[w].widgetType=website.widgetType;
                    websites[w].pageId=website.pageId;
                    websites[w].size=website.size;
                    websites[w].text=website.text;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(wgid) {
            for(var w in widgets) {
                if( widgets[w]._id === wgid ) {
                    widgets.splice(w,1);
                    return true;
                }
            }
            return false;
        }
    }
})();