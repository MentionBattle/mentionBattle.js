(function () {
    'use strict';

    angular
        .module('app')
        .component('contender', {
            templateUrl: 'contender.tpl.html',
            controllerAs: 'vm',
            bindings: {
                number: '='
            },
            controller: function (contendersRepository) {
                var vm = this;

                vm.repo = contendersRepository;
            }
        })
})();