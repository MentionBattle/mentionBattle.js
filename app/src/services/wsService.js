(function () {
    'use strict';

    angular
        .module('app')
        .service('wsService', wsService);

    function wsService($log, $timeout, $rootScope, webSocketConfig, contendersRepository, loadingState) {
        var ws = null;
        var retryCount = 5;
        var methodsMap = {
            'init': contendersRepository.setContenders,
            'mention': contendersRepository.addMention
        };

        return {
            open: open,
            close: close
        };

        function open() {
            ws = new WebSocket('ws://' + webSocketConfig.host + ':' + webSocketConfig.port + '/' + webSocketConfig.endpoint);
            ws.onclose = onClose;
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
        }

        function onClose(event) {
            if (!event.wasClean) {
                $log.error('WS disconnected abnormally');
            } else {
                $log.warn('WS disconnected normally');
            }

            retryCount--;
            if (retryCount > 0) {
                loadingState.setMessage('Connection try #' + (5 - retryCount));
                $timeout(function () {
                    $log.info('Trying to reconnect');
                    open();
                }, 2000);
            } else {
                loadingState.setError('Could not connect to server after 5 tries');
            }
            $rootScope.$apply();
        }

        function onOpen() {
            $log.info('WS connection established');
            loadingState.setMessage('Connection established');
            retryCount = 5;
            $rootScope.$apply();
        }
    }
})();