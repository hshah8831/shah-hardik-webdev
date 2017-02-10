(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.register=register;

        function register(user) {
            if(user.password1 === user.password2){
                $location.url('/user/new');
            } else {
                vm.error='passwords do not match';
            }
        }
    };
})();
