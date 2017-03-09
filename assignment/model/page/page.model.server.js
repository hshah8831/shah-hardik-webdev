module.exports = function () {
    var mongoose = require("mongoose");
    var pageModel = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    }
    return pageModel;

    function createPage(websiteId, page) {

    }

    function findAllPagesForWebsite(websiteId) {

    }

    function findPageById(pageId) {

    }

    function updatePage(pageId, page) {

    }

    function deletePage(pageId) {

    }
}
