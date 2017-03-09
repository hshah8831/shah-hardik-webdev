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
        vm.createText = createText;

        function createText() {
            var widget = {};
            widget.pageId = vm.pageId;
            widget.widgetType = "TEXT";
            createAndNavigate(widget);
        }
        function createHeader() {
            var widget = {};
            widget.pageId = vm.pageId;
            widget.widgetType = "HEADER";
            createAndNavigate(widget);
        }

        function createYoutube() {
            var widget = {};
            widget.pageId = vm.pageId;
            widget.widgetType = "YOUTUBE";
            createAndNavigate(widget);
        }

        function createImage() {
            var widget = {};
            widget.pageId = vm.pageId;
            widget.widgetType = "IMAGE";
            createAndNavigate(widget);
        }

        function createAndNavigate(widget) {
            var promiseWidgets = WidgetService.findWidgetsByPageId(vm.pageId);
            var widgets;
            promiseWidgets.then(function (res) {
                widgets = res.data;
                widget.index = widgets.length;
                var promiseWidget = WidgetService.createWidget(vm.pageId, widget);
                promiseWidget.then(function (res) {
                    widget = res.data;
                    var dest = "/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+ vm.pageId+ "/widget/"+widget._id;
                    $location.url(dest);
                }, function (res) {
                    vm.error = 'user not found';
                });
            }, function (res) {
                vm.error = 'user not found';
            });
        }
    }
})();