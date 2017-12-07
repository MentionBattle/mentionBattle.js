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
            controller: function ($scope, contendersRepository, events) {
                var vm = this;

                vm.repo = contendersRepository;
                vm.contender = vm.repo.getContender(vm.number);
                vm.computeProgress = computeProgress;

                $scope.$on(events.NEW_CONTENDERS, function () {
                    vm.contender = vm.repo.getContender(vm.number);
                });

                function computeProgress() {
                    var current = vm.contender.votes;
                    var maximum = Math.max(contendersRepository.getContender(1).votes, contendersRepository.getContender(2).votes);
                    return (100 * current / maximum).toString() + '%';
                }
            }
        })
})();