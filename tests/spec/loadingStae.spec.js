(function () {
    'use strict';

    describe('loadingState', function () {
        var loadingState = null;
        var $timeout = null;
        var defaultState = {
            state: 'loading',
            error: '',
            message: 'Now loading MentionBattle..'
        };

        beforeEach(function () {
            module('app');
            inject(function ($injector, _$timeout_) {
                loadingState = $injector.get('loadingState');
                $timeout = _$timeout_;
            });
        });

        it('should return default state', function () {
            expect(loadingState.getState()).toEqual(defaultState);
        });

        it('should change state after some time', function (done) {
            loadingState.setState('test');
            expect(loadingState.getState().state).toBe(defaultState.state);
            $timeout.flush(401);
            expect(loadingState.getState().state).toBe('test');
            done();
        });

        it('should change message to new on call', function () {
            expect(loadingState.getState().message).toBe(defaultState.message);
            loadingState.setMessage('test');
            expect(loadingState.getState().message).toBe('test');
        });

        it('should append error', function () {
            expect(loadingState.getState().error).toBe(defaultState.error);
            loadingState.setError('test');
            expect(loadingState.getState().error).toBe(defaultState.error + 'test');
        });
    });

})();