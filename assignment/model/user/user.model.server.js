module.exports = function () {
    var mongoose = require("mongoose");
    var userModel = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    }
    return userModel;
    
    function createUser(user) {
        
    }
    
    function findUserById(userId) {
        
    }
    
    function findUserByUsername(username) {
        
    }
    
    function findUserByCredentials(username, password) {
        
    }
    
    function updateUser(userId, user) {
        
    }
    
    function deleteUser(userId) {

    }
}
