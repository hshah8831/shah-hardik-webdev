(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams,WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.create = create;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.then(function (res) {
                vm.websites = res.data;
            }, function (res) {
                vm.error = 'user not found';
            });
        }
        init();

        function create(uid, website) {
            var promise = WebsiteService.createWebsite(uid, website);
            promise.then(function (res) {
                return;
            }, function (res) {
                vm.error = 'user not found';
            });
        };
    }
})();