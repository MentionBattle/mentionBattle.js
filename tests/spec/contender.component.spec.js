(function () {
    'use strict';

describe('contender component', function () {
    var contenderController = null;
    var $scope = null;
    var events = null;
    var $rootScope = null;
    var element = angular.element('<div><div class="mentions-container"></div></div>');

    var fakeContenders = {};

    var repoMock = {
        getContender: jasmine.createSpy()
    };


    beforeEach(function () {
        module('app');

        repoMock.getContender.and.callFake(function (number) {
            fakeContenders[number] = {
                votes: 500*number,
                toggleIgnoreMentions: jasmine.createSpy()
            };

            return fakeContenders[number];
        });

        inject(function ($componentController, _$rootScope_, _events_) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            contenderController = $componentController('contender', {
                $scope: $scope,
                $element: element,
                contendersRepository: repoMock,
                events: _events_
            }, {
                number: 1
            });
            events = _events_;
        });
        repoMock.getContender.calls.reset();
    });

    it('update contender by event', function () {
        $rootScope.$broadcast(events.NEW_CONTENDERS);
        $rootScope.$digest();
        expect(repoMock.getContender).toHaveBeenCalledWith(1);
    });

    it('should toggle contender off based on scrolling', function () {
        var a = angular.element(element[0].querySelector('.mentions-container'));
        $rootScope.$digest();
        a.triggerHandler('scroll');
        expect(fakeContenders[1].toggleIgnoreMentions).toHaveBeenCalled();
    });

    it('should able to compute progress properly', function () {
        var controllerResult = contenderController.computeProgress();
        expect(controllerResult).toBe('50%');
    });
});
})();