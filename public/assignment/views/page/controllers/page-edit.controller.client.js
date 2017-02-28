(function(){
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.delete = deletePage;
        vm.update = update;

        function init() {
            var promisePages = PageService.findPageByWebsiteId(vm.websiteId);
            promisePages.then(function (res) {
                vm.pages = res.data;
            }, function (res) {
                vm.error = 'user not found';
            });

            var promisePage = PageService.findPageById(vm.pageId);
            promisePage.then(function (res) {
                vm.page = res.data;
            }, function (res) {
                vm.error = 'user not found';
            });
        };
        init();
        
        function update(pid, page) {
            var promise = PageService.updatePage(pid, page);
            promise.then(function (res) {
                navigateToList();
            }, function (res) {
                vm.error = 'user not found';
            });
        }
        
        function deletePage(pid) {
            var promise = PageService.deletePage(pid);
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