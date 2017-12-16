(function () {
    'use strict';
    describe('wsService', function () {


        var wsService = null;
        var $timeout = null;
        var wsInstance = null;
        var $rootScope = null;

        var testConfig = {
            webSocketConfig: {
                "host": "zxcv",
                "port": 5555,
                "endpoint": "asdzxc"
            }
        };

        var repoMock = {
            setContenders: jasmine.createSpy(),
            addMention: jasmine.createSpy()
        };

        var stateMock = {
            getState: jasmine.createSpy(),
            setMessage: jasmine.createSpy(),
            setError: jasmine.createSpy(),
            setState: jasmine.createSpy()
        };

        beforeEach(function () {
            var RealWS = WebSocket;
            spyOn(window, "WebSocket").and.callFake(function (url, protocols) {
                wsInstance = new RealWS(url, protocols);
                return wsInstance;
            });

            module('app');
            angular.module('app')
                .service('contendersRepository', function () {
                    return repoMock;
                })
                .service('loadingState', function () {
                    return stateMock;
                })
                .service('config', function ($q) {
                    return {
                        getConfig: function () {
                            return $q.resolve(testConfig);
                        }
                    };
                });
            inject(function ($injector, _$timeout_, _$rootScope_) {
                $timeout = _$timeout_;
                wsService = $injector.get('wsService');
                $rootScope = _$rootScope_;
            });
            wsService.open();
            $rootScope.$apply();
        });


        it('should connect to a server specified by config', function () {
            expect(window.WebSocket).toHaveBeenCalledWith('ws://' + testConfig.webSocketConfig.host + ':' + testConfig.webSocketConfig.port + '/' + testConfig.webSocketConfig.endpoint);

        });

        it('should edit a message in loading state on successful opening', function () {
            wsInstance.onopen();
            expect(stateMock.setMessage).toHaveBeenCalledWith('Connection established');
        });

        it('should try to reconnect when closed badly', function () {
            for (var i = 0; i < 5; i++) {
                wsInstance.onclose({wasClean: false});
                $timeout.flush(2001);
            }
            wsInstance.onclose({wasClean: true});
            $timeout.flush(2001);
            expect(window.WebSocket).toHaveBeenCalledTimes(5);
        });

        it('should call methods on messages', function () {
            wsInstance.onmessage({data: 'init|{"123":123}'});
            wsInstance.onmessage({data: 'mention|{"124":124}'});

            expect(repoMock.setContenders).toHaveBeenCalledWith({123: 123});
            expect(repoMock.addMention).toHaveBeenCalledWith({124: 124});
            expect(function () {
                wsInstance.onmessage({data: 'invalid'});
            }).toThrow();
        });
    });
})();