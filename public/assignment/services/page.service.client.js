(function(){
    angular
        .module("WebAppMaker")
        .factory('PageService', pageService);

    function pageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };
        return api;

        function createPage(wid, page){
            page.websiteId = wid;
            page._id = (new Date()).getTime();
            pages.push(page);
        }

        function findPageByWebsiteId(wid) {
            var ret_pages = [];
            for(var p in pages){
                var page = pages[p];
                if(page.websiteId == wid){
                    ret_pages.push(page);
                }
            }
            return ret_pages;
        }

        function findPageById(pid) {
            for(var p in pages){
                var page = pages[p];
                if(page._id == pid){
                    return angular.copy(page);
                }
            }
            return null;
        }

        function updatePage(pid, page) {
            for(var p in pages) {
                if( pages[p]._id == pid ) {
                    pages[p].name=page.name;
                    pages[p].description=page.description;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pid) {
            for(var p in pages) {
                if( pages[p]._id == pid ) {
                    pages.splice(p,1);
                    return true;
                }
            }
            return false;
        }
    }
})();