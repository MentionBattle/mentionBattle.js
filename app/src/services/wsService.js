(function () {
   'use strict';

   angular
       .module('app')
       .service('wsService', wsService);

   function wsService($log, webSocketConfig) {
       var ws = null;

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
           $log.info('Received: ' + msg.data);
       }

       function onClose() {
           $log.warn('WS disconnected');
       }

       function onError(error) {
           $log.error('WS Error: ' + error.data);
       }

       function onOpen() {
           $log.info('WS connection established');
       }
   }
})();