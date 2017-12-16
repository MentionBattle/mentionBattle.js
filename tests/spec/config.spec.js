(function () {
    'use strict';
    describe('configProvider', function () {
        var defaultOptions = {
            "webSocketConfig": {
                "host": "localhost",
                "port": 8080,
                "endpoint": "mentionbattle"
            }
        };

        var newOptions = {
            "webSocketConfig": {
                "host": "zxcv",
                "port": 5555,
                "endpoint": "asdzxc"
            }
        };

        var $httpBackend = null;
        var $rootScope = null;

        var config;

        describe('Default Configuration', function () {
            beforeEach(function () {
                module('app');

                inject(function ($injector, _$httpBackend_, _$rootScope_) {
                    $httpBackend = _$httpBackend_;
                    $rootScope = _$rootScope_;
                    _$httpBackend_.expectGET('/config.json').respond(404);
                    config = $injector.get('config');
                });
            });

            it('Should get the default value', function (done) {
                $httpBackend.flush();
                config.getConfig().then(function (config) {
                    expect(config).toEqual(defaultOptions);
                    done();
                });
                $rootScope.$apply();
            });
        });

        describe('Config query', function () {
            beforeEach(function () {
                module('app');

                inject(function ($injector, _$httpBackend_, _$rootScope_) {
                    $httpBackend = _$httpBackend_;
                    $rootScope = _$rootScope_;
                    _$httpBackend_.expectGET('/config.json').respond(200, newOptions);
                    config = $injector.get('config');
                });
            });

            it('Should get the configured value', function (done) {
                $httpBackend.flush();
                config.getConfig().then(function (config) {
                    expect(config).toEqual(newOptions);
                    done();
                });
                $rootScope.$apply();
            });
        });
    });
})();