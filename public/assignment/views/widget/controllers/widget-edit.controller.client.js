(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.update = update;
        vm.delete = deleteWidget;
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            type = type.toLowerCase();
            return 'views/widget/templates/editors/widget-'+type+'-edit.view.client.html';
        }

        function update(wgid,widget) {
            WidgetService.updateWidget(wgid,widget);
        }

        function deleteWidget(wgid) {
            WidgetService.deleteWidget(wgid);
        }
    }
})();