(function(){
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.create = create;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        };
        init();

        function create(wid, page) {
            PageService.createPage(wid, page);
        }
    }
})();