(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createHeader = createHeader;
        vm.createImage = createImage;
        vm.createYoutube = createYoutube;

        function createHeader() {
            var widget = {};
            widget.pageId = vm.pageId;
            widget.widgetType = "HEADER";
            widget = WidgetService.createWidget(widget);
            var dest = "/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+ vm.pageId+ "/widget/"+widget._id;
            $location.url(dest);
        }

        function createYoutube() {
            var widget = {};
            widget.pageId = vm.pageId;
            widget.widgetType = "YOUTUBE";
            WidgetService.createWidget(widget);
            var dest = "/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+ vm.pageId+ "/widget/"+widget._id;
            $location.url(dest);
        }

        function createImage() {
            var widget = {};
            widget.pageId = vm.pageId;
            widget.widgetType = "IMAGE";
            WidgetService.createWidget(widget);
            var dest = "/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+ vm.pageId+ "/widget/"+widget._id;
            $location.url(dest);
        }
    }
})();