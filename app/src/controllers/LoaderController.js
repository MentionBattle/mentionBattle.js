(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoaderController', loaderController);

    function loaderController(loadingState) {
        var vm = this;

        vm.loadingState = loadingState;
    }
})();