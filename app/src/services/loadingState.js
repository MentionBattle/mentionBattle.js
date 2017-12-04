(function () {
    'use strict';

    angular
        .module('app')
        .service('loadingState', loadingState);

    function loadingState($timeout) {
        var state = {
            state: 'loading',
            error: '',
            message: 'Now loading MentionBattle..'
        };

        return {
            getState: getState,
            setMessage: setMessage,
            setError: setError,
            setState: setState,
        };

        function getState() {
            return state;
        }

        function setState(newState) {
            $timeout(function () {
                state.state = newState;
            }, 400);
        }

        function setMessage(msg) {
            state.message = msg;
        }

        function setError(error) {
            state.error += error;
        }
    }

})();