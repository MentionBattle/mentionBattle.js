(function () {
    'use strict';

    describe('mentionBattle component', function () {
        var mentionBattleController = null;
        var $scope = null;
        var events = null;
        var $rootScope = null;
        var $timeout = null;
        var element = angular.element('<div><div class="container"></div></div>');
        var date = Date.now();


        beforeEach(function () {
            module('app');
            spyOn(Date, 'now').and.callFake(function () {
                return date;
            });

            inject(function ($componentController, _$rootScope_, _events_, _$timeout_) {
                $rootScope = _$rootScope_;
                $timeout = _$timeout_;
                $scope = $rootScope.$new();
                mentionBattleController = $componentController('mentionBattle', {
                    $scope: $scope,
                    $element: element,
                    events: _events_,
                    $timeout: $timeout
                });
                events = _events_;
            });
        });

        it('should add and kill plane by event', function () {
            Date.now.calls.reset();
            date += 500;
            var planeContainer = element[0].querySelector('.container');
            expect(_.size(planeContainer.querySelectorAll('.plane'))).toBe(0);
            $rootScope.$broadcast(events.NEW_MENTION, 1);
            $rootScope.$broadcast(events.NEW_MENTION, 2);
            $rootScope.$digest();
            $rootScope.$digest();
            expect(Date.now).toHaveBeenCalledTimes(3);
            expect(_.size(planeContainer.querySelectorAll('.plane'))).toBe(1);
            $timeout.flush(3000);
            expect(_.size(planeContainer.querySelectorAll('.plane'))).toBe(0);
            date += 500;
            $rootScope.$broadcast(events.NEW_MENTION, 2);
            expect(_.size(planeContainer.querySelectorAll('.plane'))).toBe(1);
        });
    });
})();