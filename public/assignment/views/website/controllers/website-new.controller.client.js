(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams,WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.create = create;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function create(uid, website) {
            WebsiteService.createWebsite(uid, website);
        };
    }
})();