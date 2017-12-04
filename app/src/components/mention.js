(function () {
    'use strict';

    angular
        .module('app')
        .component('mention', {
            templateUrl: 'mention.tpl.html',
            controllerAs: 'vm',
            bindings: {
                mention: '='
            },
            controller: function () {

            }
        })
})();