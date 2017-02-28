(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.registerIndexChange = registerIndexChange;

        function init() {
            var promise = WidgetService.findWidgetsByPageId(vm.pageId);
            promise.then(function (res) {
                vm.widgets = res.data;
                vm.widgets.sort(function(a, b) {
                    return a.index - b.index;
                });
            }, function (res) {
                vm.error = 'user not found';
            });
        }
        init();


        function doYouTrustUrl(url) {
            if(url){
                var baseUrl = "https://www.youtube.com/embed/";
                var urlParts = url.split('/');
                var id = urlParts[urlParts.length - 1];
                baseUrl += id;
                return $sce.trustAsResourceUrl(baseUrl);
            }
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function registerIndexChange(initial, final) {
            var promise = WidgetService.changeIndex(vm.pageId, initial, final);
            promise.then(
                function (res) {
                    //success
                },
                function (res) {
                    //failed
                }
            )
        }
    }
})();