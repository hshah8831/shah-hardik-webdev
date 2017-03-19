(function() {
    angular
        .module("WebAppMaker")
        .factory('FlickrService', flickrService);

    function flickrService($http) {
        var key = "77d58defefc2d89966beb965154e5571";
        var secret = "7b61b923452810ea";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            "searchPhotos": searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }

})();