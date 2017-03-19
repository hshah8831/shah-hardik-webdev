(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetFlickrSearch", widgetFlickrSearch);

    function widgetFlickrSearch($routeParams, $location, FlickrService, WidgetService) {
        var vm = this;
        vm.searchPhotos = searchPhotos
        vm.selectPhoto = selectPhoto;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                }, function (err) {
                    vm.error = err;
                });
        }

        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (widget) {
                    if(widget.image){
                        widget.image.url = url;
                    } else {
                        widget.image = {};
                        widget.image.url = url;
                    }
                    return WidgetService
                        .updateWidget(vm.widgetId, widget);
                },function (err) {
                    vm.error = err;
                }).then(function (result) {
                    var dest = "/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+ vm.pageId+ "/widget/" + vm.widgetId;
                    $location.url(dest);
                }, function (err) {
                    vm.error = err;
                });
        }
    }
})();