(function () {
    'use strict';

    var planeRed = '<i class="plane red"></i>';
    var planeBlue = '<i class="plane blue"></i>';

    var planeDomElementDieInSeconds = 5;

    angular
        .module('app')
        .component('mentionBattle', {
            templateUrl: 'mention-battle.tpl.html',
            controllerAs: 'vm',
            controller: function ($scope, $element, events, $timeout) {
                var vm = this;
                var target = document.querySelector('mention-battle').querySelector('.container');

                $scope.$on(events.NEW_MENTION, function ($event, contenderNumber) {
                    var newPlane = angular.element(contenderNumber === 1 ? planeRed : planeBlue);
                    angular.element(target).append(newPlane);
                    $timeout(function () {
                        newPlane.addClass('move');
                    });
                    $timeout(function () {
                        newPlane.remove();
                    }, planeDomElementDieInSeconds * 1000);
                });
            }
        })
})();