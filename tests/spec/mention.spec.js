(function () {
    'use strict';
    describe('mention model', function () {
        var Mention = null;
        var instance = null;
        var timestamp = moment('2013-02-04T10:35:24-08:00');

        beforeEach(function () {
            module('app');
            inject(function ($injector) {
                Mention = $injector.get('Mention');
            });
            instance = new Mention({
                from: 'aaa',
                name: 'bbb',
                text: 'ccc',
                url: 'ddd',
                avatarUrl: 'eeee',
                timestamp: timestamp.toISOString()
            });
        });

        it('should map object properly', function () {
            expect(instance.from).toBe('aaa');
            expect(instance.name).toBe('bbb');
            expect(instance.text).toBe('ccc');
            expect(instance.url).toBe('ddd');
            expect(instance.avatarUrl).toBe('eeee');
            expect(instance.timestamp.isValid()).toBeTruthy();
            expect(timestamp.format()).toBe(instance.timestamp.format());
        });
    });
})();