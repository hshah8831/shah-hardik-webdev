(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, $rootScope, UserService) {
        var vm = this;
        function init(){
            vm.register=register;
        }
        init();

        function register(user) {
            if(!user || !user.password1 || !user.password2){
                vm.error = "required field missing";
                return;
            }
            if(user.password1 === user.password2){
                user.password = user.password1;
                //delete password1 and password2
                delete user.password1;
                delete user.password2;
                //add the new user to the database
                UserService
                    .register(user)
                    .then(function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    } ,function (err) {
                        vm.error = "User does not exist";
                    });
            } else {
                vm.error='passwords do not match';
            }
        }


    };
})();
