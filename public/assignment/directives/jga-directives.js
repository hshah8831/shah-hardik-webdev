(function () {
    angular
        .module("jgaDirective", [])
        .directive("jgaSortable", sortableDir);

    function sortableDir($http) {
        function linkFunc(scope, element, attributes) {
            var startIndex = -1;
            var stopIndex = -1;
            element.sortable({
                axis: 'y',
                start: function(event, ui){
                    startIndex=ui.item.index();
                },
                stop: function(event, ui){
                    stopIndex=ui.item.index();
                    scope.callbackFn({initial: startIndex,final: stopIndex});
                }
            });
        }
        return {
            scope: { callbackFn: '&' },
            link: linkFunc
        };
    }
})();
