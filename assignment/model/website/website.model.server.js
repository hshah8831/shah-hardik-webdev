module.exports = function () {
    var mongoose = require("mongoose");
    var websiteSchema = require("./website.schema.server.js");
    var userSchema = require("../user/user.schema.server.js");
    var q = require("q");
    var modelWebsite = mongoose.model('website', websiteSchema);
    var modelUser = mongoose.model('user', userSchema);

    var websiteModel = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    }
    return websiteModel;

    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();
        website._user = userId;
        modelWebsite.create(website, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        modelWebsite.find({_user:userId}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        modelWebsite.findById(websiteId, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        modelWebsite.update({_id: websiteId}, { $set: website}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();

        /*
        modelWebsite.findById(websiteId, function (err, website) {
            if(err) deferred.reject(err);
            else{
                modelUser.update({_id: website._user}
                    , {$pull: {websites: website._id}}
                    , function (err) {
                        if(err) deferred.reject(err);
                        else deferred.resolve(website);
                    });
            }
        });
        */

        modelWebsite.remove({_id: websiteId}, function (err, website) {
            if(err) deferred.reject(err);
            else deferred.resolve(website);
        });
        return deferred.promise;
    }
}
