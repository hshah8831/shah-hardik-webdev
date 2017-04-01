(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;
        vm.register=register;

        function login(user) {
            if(!user || !user.username || !user.password){
                vm.error = "required field missing";
            } else {
                var promise = UserService.login(user);
                promise.then(function (res) {
                    var loginUser = res.data;
                    $rootScope.currentUser = loginUser;
                    $location.url('/user/' + loginUser._id);
                }, function (res) {
                    vm.error = 'user not found';
                });
            }
        }

        function register() {
            $location.url('/register/');
        }
    };
})();