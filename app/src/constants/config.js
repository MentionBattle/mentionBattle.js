(function () {
    'use strict';
    angular
        .module('app')
        .provider('config', function () {
            var options = {
                "webSocketConfig": {
                    "host": "localhost",
                    "port": 8080,
                    "endpoint": "mentionbattle"
                }
            };
            this.config = function (opt) {
                angular.extend(options, opt);
            };
            this.$get = [function () {
                return options;
            }];
        })
})();