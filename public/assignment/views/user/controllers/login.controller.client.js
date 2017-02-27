(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;
        vm.register=register;

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.then(function (res) {
                var loginUser = res.data;
                $location.url('/user/' + loginUser._id);
            }, function (res) {
                vm.error = 'user not found';
            });
        }

        function register() {
            $location.url('/register/');
        }
    };
})();