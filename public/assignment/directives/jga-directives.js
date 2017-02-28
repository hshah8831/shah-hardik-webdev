(function () {
    angular
        .module("jgaDirective", [])
        .directive("jgaSortable", sortableDir)
        .directive("fileInput", ['$parse', fileInput]);

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
    
    function fileInput($parse) {
        function linkFunc(scope, element, attributes) {
            element.bind('change', function () {
                $parse(attributes.fileInput)
                    .assign(scope, element[0].files)
                scope.$apply();
            })
        }
        
        return {
            restrict: 'A',
            link: linkFunc
        }
    }
})();
