(function(){
    angular
        .module("WebAppMaker")
        .factory('WidgetService', widgetService);

    function widgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget,
            "changeIndex": changeIndex,
            "fileUpload": fileUpload
        };
        return api;

        function createWidget(pid, widget){
            return $http.post("/api/page/"+pid+"/widget", widget);
        }

        function findWidgetsByPageId(pid) {
            return $http.get("/api/page/"+pid+"/widget");
        }

        function findWidgetById(wgid) {
            return $http.get("/api/widget/"+wgid);
        }

        function updateWidget(wgid, widget) {
            return $http.put("/api/widget/"+wgid, widget);
        }

        function deleteWidget(wgid) {
            return $http.delete("/api/widget/"+wgid);
        }

        function changeIndex(pid, startIndex, stopIndex) {
            return $http.put("/api/page/"+pid+"/widget?initial="+startIndex+"&final="+stopIndex);
        }

        function fileUpload(file) {
            return $http.post("/api/upload", file, {transformRequest: angular.identity, headers:{'Content-Type': undefined}});
        }
    }
})();