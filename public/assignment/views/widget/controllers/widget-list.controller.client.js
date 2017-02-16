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

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();


        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();