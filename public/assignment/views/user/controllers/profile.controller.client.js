(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams,$rootScope,$location, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.update = update;
        vm.logout = logout;

        function init() {
            var promise = UserService.checkLoggedIn();
            promise.then(function (res) {
                vm.user = res;
            }, function (res) {
                vm.error = 'user not found';
            });
        }
        init();

        function update(newUser) {
            var promise = UserService.updateUser(userId, newUser);
            promise.then(function (res) {
                vm.message = "user successfully updated"
            }, function (res) {
                vm.error = "unable to update user";
            });
        };

        function logout() {
            var promise = UserService.logout();
            promise.then(function (res) {
                $rootScope.currentUser = null;
                $location.url("/login");
            }, function (res) {
                vm.error = 'no user logged in';
            });
        };
    };
})();