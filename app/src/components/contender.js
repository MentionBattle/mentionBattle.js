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
            controller: function ($scope, $element, contendersRepository, events) {
                var vm = this;
                var mentionsContainer = angular.element($element[0].querySelector('.mentions-container'));

                vm.repo = contendersRepository;
                vm.contender = vm.repo.getContender(vm.number);
                vm.computeProgress = computeProgress;

                mentionsContainer.bind('scroll', function () {
                    vm.contender.toggleIgnoreMentions(mentionsContainer[0].scrollTop > 0);
                });

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