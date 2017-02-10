(function(){
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.delete = deletePage;
        vm.update = update;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        };
        init();
        
        function update(pid, page) {
            PageService.updatePage(pid, page);
        }
        
        function deletePage(pid) {
            PageService.deletePage(pid);
        }
    }
})();