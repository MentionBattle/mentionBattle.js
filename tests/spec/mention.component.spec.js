(function () {
    'use strict';
    describe('mention component controller', function () {
        var mentionComponentController = null;

        var $windowMock = {
            open: jasmine.createSpy()
        };

        beforeEach(function () {
            module('app');
            inject(function ($componentController) {
                mentionComponentController = $componentController('mention', {
                    $window: $windowMock
                });
            });
        });

        it('open new window on mention click', function () {
            mentionComponentController.mention = {
                url: '123'
            };
            mentionComponentController.mentionClick();
            expect($windowMock.open).toHaveBeenCalledWith('123', '_blank');
        });
    });
})();