(function () {
    'use strict';

    angular
        .module('app')
        .directive('preserveHeight', preserveHeight);

    function preserveHeight() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return element.parent()[0].clientHeight;
                }, function (newh) {
                    var start = newh - 92;
                    element.css('height', Math.floor(start / 96) * 96);
                })
            }
        };
    }
})();