(function(){
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.create = create;
        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.then(function (res) {
                vm.pages = res.data;
            }, function (res) {
                vm.error = 'user not found';
            });
        };
        init();

        function create(wid, page) {
            var promise = PageService.createPage(wid, page);
            promise.then(function (res) {
                navigateToList();
            }, function (res) {
                vm.error = 'user not found';
            });
        }

        function navigateToList() {
            var dest = "/user/"+vm.userId+"/website/"+vm.websiteId+"/page/";
            $location.url(dest);
        }
    }
})();