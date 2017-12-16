(function () {
    'use strict';

    describe('preserveHeight directive', function () {
        var $scope = null;
        var $rootScope = null;
        var $compile = null;

        beforeEach(function () {
            module('app');
            inject(function (_$rootScope_, _$compile_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            });

            $scope = $rootScope.$new();
        });

        it('should set height by div 96 pixels', function () {
            var element = angular.element('<div id="parent"><div id="target" preserve-height="96" top-offset="92"></div></div>');
            var compiledElement = $compile(element)($scope);
            angular.element(document.body).append(compiledElement);
            $scope.$digest();
            compiledElement.css('height', 200);
            $scope.$digest();
            expect(angular.element(compiledElement[0].querySelector('#target')).height()).toBe(Math.floor((200 - 92) / 96) * 96);
        });
    });
})();