(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.then(function (res) {
                vm.websites = res.data;
            }, function (res) {
                vm.error = 'user not found';
            });
        };
        init();
    }
})();