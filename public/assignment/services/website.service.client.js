(function(){
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', websiteService);

    function websiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite":updateWebsite,
            "deleteWebsite":deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website",website);
        }

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid);
        }
        
        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function updateWebsite(wid, website) {
            return $http.put("/api/website/"+wid, website);
        }

        function deleteWebsite(wid) {
            return $http.delete("/api/website/"+wid);
        }
    }
})();