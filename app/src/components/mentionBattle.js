(function () {
    'use strict';

    var planeRed = '<i class="plane red"></i>';
    var planeBlue = '<i class="plane blue"></i>';

    var planeDomElementDieInSeconds = 2.8;

    angular
        .module('app')
        .component('mentionBattle', {
            templateUrl: 'mention-battle.tpl.html',
            controllerAs: 'vm',
            controller: function ($scope, $element, events, $timeout) {
                var target = document.querySelector('mention-battle').querySelector('.container');
                var lastPlane = Date.now();

                $scope.$on(events.NEW_MENTION, makePlane);

                function makePlane($event, contenderNumber) {
                    if (Date.now() - lastPlane < 200) {
                        return;
                    }

                    var newPlane = angular.element(contenderNumber === 1 ? planeRed : planeBlue);
                    angular.element(target).append(newPlane);
                    $timeout(function () {
                        newPlane.addClass('move');
                    });
                    $timeout(function () {
                        newPlane.remove();
                    }, planeDomElementDieInSeconds * 1000);
                    lastPlane = Date.now();
                }
            }
        });
})();