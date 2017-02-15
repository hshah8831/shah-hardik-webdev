(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.register=register;

        function register(user) {
            if(user.password1 === user.password2){
                user.password = user.password1;
                //delete password1 and password2
                delete user.password1;
                delete user.password2;
                //add the new user to the database
                user = UserService.createUser(user);
                var dest = "/user/"+user._id;
                $location.url(dest);
            } else {
                vm.error='passwords do not match';
            }
        }
    };
})();
