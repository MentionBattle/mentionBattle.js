(function () {
    'use strict';
    angular
        .module('app')
        .service('config', function ($http, $q) {
            var options = {
                "webSocketConfig": {
                    "host": "localhost",
                    "port": 8080,
                    "endpoint": "mentionbattle"
                }
            };

            var configPromise = $q.defer();

            $http
                .get('/config.json')
                .success(function (newConfig) {
                    options = newConfig;
                    configPromise.resolve(options);
                })
                .catch(function () {
                    configPromise.resolve(options);
                });

            return {
                getConfig: getConfig
            };

            function getConfig() {
                return configPromise.promise;
            }
        });
})();