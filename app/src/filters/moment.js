(function () {
    'use strict';

    angular
        .module('app')
        .filter('moment', momentFilter);

    function momentFilter(moment) {
        return function (input, momentFn) {
            var args = Array.prototype.slice.call(arguments, 2),
                momentObj = moment(input);
            return momentObj[momentFn].apply(momentObj, args);
        };
    }
})();