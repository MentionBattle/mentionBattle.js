(function () {
    'use strict';

    angular
        .module('app')
        .service('wsService', wsService);

    function wsService($log, webSocketConfig, contendersRepository, loadingState, $rootScope) {
        var ws = null;
        var methodsMap = {
            'init': contendersRepository.setContenders,
            'mention': contendersRepository.addMention
        };

        return {
            state: checkState,
            open: open,
            close: close
        };

        function checkState() {
            return (ws || {readyState: 3}).readyState;
        }

        function open() {
            ws = new WebSocket('ws://' + webSocketConfig.host + ':' + webSocketConfig.port + '/' + webSocketConfig.endpoint);
            ws.onclose = onClose;
            ws.onerror = onError;
            ws.onmessage = onMessage;
            ws.onopen = onOpen;
        }

        function close() {
            if (ws) {
                ws.close(1000);
            }
        }

        function onMessage(msg) {
            var parts = msg.data.split('|');
            if (!methodsMap[parts[0]]) {
                $log.error('No such method: ' + parts[0]);
                return;
            }

            methodsMap[parts[0]](JSON.parse(parts[1]));
            $rootScope.$apply();
            $log.info('Received: ' + msg.data);
        }

        function onClose() {
            $log.warn('WS disconnected');
        }

        function onError(error) {
            loadingState.setError('WS Error: ' + error.data);
            $rootScope.$apply();
            $log.error('WS Error: ' + error.data);
        }

        function onOpen() {
            loadingState.setState('done');
            $rootScope.$apply();
            $log.info('WS connection established');
        }
    }
})();