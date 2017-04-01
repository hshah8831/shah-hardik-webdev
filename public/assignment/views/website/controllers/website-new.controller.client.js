(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($location, $routeParams,WebsiteService) {
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
            if(!website || !website.name){
                vm.error = "required field missing";
                return;
            }
            var promise = WebsiteService.createWebsite(uid, website);
            promise.then(function (res) {
                navigateToList();
            }, function (res) {
                vm.error = 'user not found';
            });
        };

        function navigateToList() {
            var dest = "/user/"+vm.userId+"/website/";
            $location.url(dest);
        }
    }
})();