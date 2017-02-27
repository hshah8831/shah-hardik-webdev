(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.update = update;
        vm.delete = deleteWidget;
        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise.then(function (res) {
                vm.widget = res.data;
            }, function (res) {
                vm.error = "widget not found";
            });
        }
        init();

        function getEditorTemplateUrl(type) {
            type = type.toLowerCase();
            return 'views/widget/templates/editors/widget-'+type+'-edit.view.client.html';
        }

        function update(wgid,widget) {
            var promise = WidgetService.updateWidget(wgid,widget);
            promise.then(function (res) {
                return;
            }, function (res) {
                vm.error = "widget not found";
            });
        }

        function deleteWidget(wgid) {
            var getPromise = WidgetService.findWidgetById(wgid);
            getPromise.then(function (res) {
                var widget = res.data;
                var promiseWidgets = WidgetService.findWidgetsByPageId(vm.pageId);
                promiseWidgets.then(function (res) {
                    var widgets = res.data;
                    var movePromise = WidgetService.changeIndex(vm.pageId, widget.index, widgets.length);
                    movePromise.then(function (res) {
                        var deletePromise = WidgetService.deleteWidget(wgid);
                        deletePromise.then(function () {
                            var dest = "/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+ vm.pageId+ "/widget/";
                            $location.url(dest)
                        }, function (res) {
                            vm.error = 'user not found';
                        })
                    }, function (res) {
                        vm.error = 'user not found';
                    });
                }, function (res) {
                    vm.error = 'user not found';
                });
            }, function (res) {
                vm.error = 'user not found';
            });
        }
    }
})();