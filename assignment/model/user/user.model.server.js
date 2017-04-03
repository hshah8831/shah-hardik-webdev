module.exports = function () {
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server.js");
    var q = require("q");
    var model = mongoose.model('user', userSchema);
    var userModel = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByFacebookId:findUserByFacebookId
    }
    return userModel;
    
    function createUser(user) {
        var deferred = q.defer();
        model.create(user, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }
    
    function findUserById(userId) {
        var deferred = q.defer();
        model.findById(userId, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }
    
    function findUserByUsername(username) {
        var deferred = q.defer();
        model.find({username:username}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }
    
    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        model.findOne({username:username, password: password}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }
    
    function updateUser(userId, user) {
        var deferred = q.defer();
        model.update({_id: userId}, { $set: user}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }
    
    function deleteUser(userId) {
        var deferred = q.defer();
        model.remove({_id: userId}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function findUserByFacebookId(facebookId) {
        return model.findOne({'facebook.id': facebookId});
    }
}
