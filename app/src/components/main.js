(function () {
    'use strict';

    angular
        .module('app')
        .component('main', {
            templateUrl: 'main.tpl.html',
            controllerAs: 'vm',
            controller: function (wsService, loadingState) {
                var vm = this;

                vm.loadingState = loadingState;

                wsService.open();
            }
        });
})();