(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.create = create;

        function create(widget) {
            widget.pageId = vm.pageId;
            WidgetService.creat(widget);
        }
    }
})();