(function () {
    'use strict';

    angular
        .module('app', [])
        .constant('moment', moment)
        .constant('_', _)
        .run(function ($rootScope, loadingState) {
            $rootScope.loadingState = loadingState;
        })
        .run(function (wsService) {
            wsService.open();
        });

    angular.element(document).ready(function () {
        $.get('/config.json', function (configData) {

            angular.module('app').config(['configProvider', function (configProvider) {
                configProvider.config(configData);
            }]);

            angular.bootstrap(document.querySelector('body'), ['app']);
        });
    });
})();