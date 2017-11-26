(function () {
    'use strict';

    angular
        .module('app')
        .constant('wsStates', {
            CONNECTING: 0,
            OPEN: 1,
            CLOSING: 2,
            CLOSED: 3
        });
})();