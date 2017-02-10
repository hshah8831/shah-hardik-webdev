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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite (wid) {
            WebsiteService.deleteWebsite(wid);
        };
        
        function updateWebsite(wid, website) {
            if(WebsiteService.updateWebsite(wid, website) === false){
                vm.error = "could not update";
            };
        }
    }
})();