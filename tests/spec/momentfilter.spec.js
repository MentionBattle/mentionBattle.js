(function () {
    'use strict';

    describe('moment filter', function () {
        var filters = null;
        var now = moment();

        beforeEach(function () {
            module('app');
            inject(function ($filter) {
                filters = $filter;
            });

        });

        it('proxy calls to momentjs', function () {
            expect(filters('moment')(now, 'calendar')).toBe(now.calendar());
            expect(filters('moment')(now, 'format')).toBe(now.format());
        });
    });

})();