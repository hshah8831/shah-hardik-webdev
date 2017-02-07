(function(){
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', websiteService);

    function websiteService() {
        var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite":updateWebsite,
            "deleteWebsite":deleteWebsite
        };
        return api;

        function createWebsite(website){
            users.push(website);
        }

        function findWebsitesByUser(uid) {
            for(var w in websites) {
                var website = websites[w];
                if( website.developerId === uid ) {
                    return website;
                }
            }
            return null;
        }

        function updateWebsite(wid, website) {
            for(var w in websites) {
                if( websites[w]._id === wid ) {
                    websites[w].description=website.description;
                    websites[w].name=website.name;
                    websites[w].developerId=website.developerId;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(wid) {
            for(var w in websites) {
                if( websites[w]._id === wid ) {
                    websites.splice(w,1);
                    return true;
                }
            }
            return false;
        }
    }
})();