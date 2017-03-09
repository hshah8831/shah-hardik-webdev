module.exports = function () {
    var mongoose = require("mongoose");
    var websiteModel = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    }
    return websiteModel;

    function createWebsiteForUser(userId, website) {

    }

    function findAllWebsitesForUser(userId) {

    }

    function findWebsiteById(websiteId) {

    }

    function updateWebsite(websiteId, website) {

    }

    function deleteWebsite(websiteId) {

    }
}
