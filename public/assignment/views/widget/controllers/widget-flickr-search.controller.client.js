(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetFlickrSearch", widgetFlickrSearch);

    function widgetEditController(FlickrService) {
        var vm = this;
        vm.searchPhotos = function(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }
    }
})();