(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.update = update;

        function init() {
            var promise = UserService.findUserById(userId);
            promise.then(function (res) {
                vm.user = res.data;
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
    };
})();