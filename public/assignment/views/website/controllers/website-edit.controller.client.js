(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.delete = deleteWebsite;
        vm.update = updateWebsite;

        function init() {
            var promiseWebsite = WebsiteService.findWebsiteById(vm.websiteId);
            var promiseWebsites = WebsiteService.findWebsitesByUser(vm.userId);

            promiseWebsites.then(function (res) {
                vm.websites = res.data;
            }, function (res) {
                vm.error = 'user not found';
            });

            promiseWebsite.then(function (res) {
                vm.website = res.data;
            }, function (res) {
                vm.error = 'user not found';
            });
        }
        init();

        function deleteWebsite (wid) {
            var promise = WebsiteService.deleteWebsite(wid);
            promise.then(function (res) {
                navigateToList();
            }, function (res) {
                vm.error = 'user not found';
            });
        };

        
        function updateWebsite(wid, website) {
            var promise = WebsiteService.updateWebsite(wid, website);
            promise.then(function (res) {
                navigateToList();
            }, function (res) {
                vm.error = 'user not found';
            });
        }

        function navigateToList() {
            var dest = "/user/"+vm.userId+"/website/";
            $location.url(dest);
        }
    }
})();