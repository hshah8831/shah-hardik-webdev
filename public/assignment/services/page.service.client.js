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
            "findPageByWebsiteId": findWidgetsByPageId,
            "findPageById": findWidgetById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };
        return api;

        function createPage(page){
            users.push(page);
        }

        function findPageByWebsiteId(wid) {
            for(var p in pages){
                var page = pages[p];
                if(page.websiteId === wid){
                    return page;
                }
            }
            return null;
        }

        function findPageById(pid) {
            for(var p in pages){
                var page = pages[p];
                if(page._id === pid){
                    return page;
                }
            }
            return null;
        }

        function updateWidget(pid, page) {
            for(var p in pages) {
                if( pages[p]._id === pid ) {
                    pages[w].name=page.name;
                    pages[w].websiteId=page.websiteId;
                    pages[w].description=page.description;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(wgid) {
            for(var p in pages) {
                if( pages[p]._id === pid ) {
                    pages.splice(p,1);
                    return true;
                }
            }
            return false;
        }
    }
})();