(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {

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
            return $http.post("/api/user/", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserById(uid) {
            return $http.get("/api/user/"+uid);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }
        
        function updateUser(uid, user) {
            return $http.put("/api/user/"+uid, user);
        }
        
        function deleteUser(uid) {
            return $http.delete("/api/user/"+uid);
        }
    }
})();