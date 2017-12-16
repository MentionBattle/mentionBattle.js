(function () {
    'use strict';

    angular
        .module('app')
        .service('wsService', wsService);

    function wsService($log, $timeout, $rootScope, config, contendersRepository, loadingState) {
        var ws = null;

        var retryCount = 5;
        var methodsMap = {
            'init': contendersRepository.setContenders,
            'mention': contendersRepository.addMention
        };

        return {
            open: open
        };

        function open() {
            config.getConfig().then(function (config) {
                ws = new WebSocket('ws://' + config.webSocketConfig.host + ':' + config.webSocketConfig.port + '/' + config.webSocketConfig.endpoint);
                ws.onclose = onClose;
                ws.onmessage = onMessage;
                ws.onopen = onOpen;
            });
        }

        function onMessage(msg) {
            var parts = msg.data.split(/\|(.+)/);
            if (!methodsMap[parts[0]]) {
                throw new Error('No such method: ' + parts[0]);
            }

            methodsMap[parts[0]](JSON.parse(parts[1]));
            $rootScope.$apply();
        }

        function onClose(event) {
            if (!event.wasClean) {
                $log.error('WS disconnected abnormally');
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
            } else {
                $log.warn('WS disconnected normally');
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