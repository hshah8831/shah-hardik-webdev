(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        function init(){
            vm.register=register;
        }
        init();

        function register(user) {
            if(user.password1 === user.password2){
                user.password = user.password1;
                //delete password1 and password2
                delete user.password1;
                delete user.password2;
                //add the new user to the database
                UserService.createUser(user).then(function (res) {
                    user = res.data;
                    var dest = "/user/"+user._id;
                    $location.url(dest);
                },function (err) {
                    vm.error = "User does not exist";
                });
            } else {
                vm.error='passwords do not match';
            }
        }
    };
})();
