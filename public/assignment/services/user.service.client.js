(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice_wonder@yomail.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob_marley@yomail.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly_garcia@yomail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose_annunzi@yomail.com" }
        ];

        var api = {
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser":updateUser,
            "deleteUser":deleteUser
        };
        return api;

        function createUser(user){
            users.push(user);
        }

        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id == uid ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }
        
        function updateUser(uid, user) {
            for(var u in users) {
                var user = users[u];
                if( user._id == userId ) {
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    return user;
                }
            }
            return null;
        }
        
        function deleteUser(uid) {
            for(var u in users) {
                if( users[u]._id == uid ) {
                    users.splice(u,1);
                    return true
                }
            }
            return false;
        }
    }
})();