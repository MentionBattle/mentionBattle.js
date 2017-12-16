(function () {
    'use strict';
    describe('main component', function () {
        var mainComponetController = null;

        var wsServiceMock = {
            open: jasmine.createSpy()
        };

        beforeEach(function () {
            module('app');
            inject(function ($componentController) {
                mainComponetController = $componentController('main', {
                    wsService: wsServiceMock
                });
            });
        });

        it('open websocket', function () {
            expect(wsServiceMock.open).toHaveBeenCalled();
        });
    });
})();