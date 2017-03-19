module.exports = function () {
    var mongoose = require("mongoose");
    var pageSchema = require("./page.schema.server.js");
    var q = require("q");
    var model = mongoose.model('page', pageSchema);

    var pageModel = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    }
    return pageModel;

    function createPage(websiteId, page) {
        var deferred = q.defer();
        page._website = websiteId;
        model.create(page, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        model.find({_website:websiteId}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();
        model.findById(pageId, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function updatePage(pageId, page) {
        var deferred = q.defer();
        model.update({_id: pageId}, { $set: page}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function deletePage(pageId) {
        var deferred = q.defer();
        model.remove({_id: pageId}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }
}
