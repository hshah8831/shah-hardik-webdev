(function(){
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.then(function (res) {
                vm.pages = res.data;
            }, function (res) {
                vm.error = 'user not found';
            });
        };
        init();
    }
})();