(function () {
    'use strict';

    angular
        .module('app', ['templates', 'ui.router', 'config'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('');
        })
        .run(function (wsService) {
            wsService.open();
        });
})();