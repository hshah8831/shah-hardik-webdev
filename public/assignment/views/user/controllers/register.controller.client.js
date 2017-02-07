(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($routeParams, UserService) {
        var vm = this;
        console.log(this);
    }
})();
