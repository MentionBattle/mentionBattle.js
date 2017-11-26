(function () {
    'use strict';

    angular
        .module('app', [])
        .constant('moment', moment)
        .constant('_', _);
})();
angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('contender.tpl.html','<header class="info">\r\n    <div>\r\n    <header>{{vm.contender.name}}</header>\r\n    <article>{{vm.contender.votes}}</article>\r\n    </div>\r\n    <div class="avatar">\r\n        <i ng-style="{\'background-image\':\'url(\' + vm.contender.image + \')\'}"></i>\r\n    </div>\r\n</header>\r\n<article class="col-md-12" preserve-height="96" top-offset="92">\r\n    <div class="contender-progress-bar col-md-1">\r\n        <div class="progress progress-bar-vertical">\r\n            <div class="progress-bar" role="progressbar" ng-style="{\'height\': vm.computeProgress()}">\r\n                <span class="sr-only">60%</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="mentions-container col-md-7">\r\n        <ul class="mentions">\r\n            <mention class="mention-list-item" ng-repeat="mention in vm.contender.mentions"\r\n                     mention="mention"></mention>\r\n        </ul>\r\n    </div>\r\n</article>');
$templateCache.put('main.tpl.html','<div ng-if="vm.loadingState.getState().state === \'loading\'" class="loading-main">\r\n    <div class="loading-container loader">\r\n        <div class="loader"></div>\r\n        <div class="message">{{vm.loadingState.getState().error || vm.loadingState.getState().message}}</div>\r\n    </div>\r\n</div>\r\n<div ng-if="vm.loadingState.getState().state === \'done\'" class="main">\r\n    <navbar></navbar>\r\n    <mention-battle></mention-battle>\r\n</div>');
$templateCache.put('mention-battle.tpl.html','<article class="jumbotron">\r\n    <div class="container">\r\n        <i class="globe"></i>\r\n        <div class="row">\r\n            <contender number="1" class="col-md-6"></contender>\r\n            <contender number="2" class="col-md-6"></contender>\r\n        </div>\r\n    </div>\r\n</article>');
$templateCache.put('mention.tpl.html','<li class="mention" ng-class="vm.mention.from" ng-click="vm.mentionClick()">\r\n    <header>\r\n        <i class="mention-avatar" ng-style="{\'background-image\':\'url(\' + vm.mention.avatarUrl + \')\'}"></i>\r\n        <span class="name" title="{{::vm.mention.name}}">{{::vm.mention.name}}</span>\r\n        <span class="time">{{vm.mention.timestamp | moment: \'calendar\'}}</span>\r\n    </header>\r\n    <article title="{{::vm.mention.text}}">\r\n        {{::vm.mention.text}}\r\n    </article>\r\n</li>');
$templateCache.put('navbar.tpl.html','<nav class="navbar navbar-default navbar-static-top">\r\n    <div class="container">\r\n        <div class="navbar-header">\r\n            <div class="navbar-logo">\r\n                <span>Mention</span><span>Battle</span>\r\n                <i class="logo"></i>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</nav>');}]);
(function () {
    'use strict';

    angular
        .module('app')
        .component('contender', {
            templateUrl: 'contender.tpl.html',
            controllerAs: 'vm',
            bindings: {
                number: '='
            },
            controller: ["$scope", "$element", "contendersRepository", "events", function ($scope, $element, contendersRepository, events) {
                var vm = this;
                var mentionsContainer = angular.element($element[0].querySelector('.mentions-container'));

                vm.repo = contendersRepository;
                vm.contender = vm.repo.getContender(vm.number);
                vm.computeProgress = computeProgress;

                mentionsContainer.bind('scroll', function () {
                    vm.contender.toggleIgnoreMentions(mentionsContainer[0].scrollTop > 0);
                });

                $scope.$on(events.NEW_CONTENDERS, function () {
                    vm.contender = vm.repo.getContender(vm.number);
                });

                function computeProgress() {
                    var current = vm.contender.votes;
                    var maximum = Math.max(contendersRepository.getContender(1).votes, contendersRepository.getContender(2).votes);
                    return (100 * current / maximum).toString() + '%';
                }
            }]
        });
})();
(function () {
    'use strict';

    angular
        .module('app')
        .component('main', {
            templateUrl: 'main.tpl.html',
            controllerAs: 'vm',
            controller: ["wsService", "loadingState", function (wsService, loadingState) {
                var vm = this;

                vm.loadingState = loadingState;

                wsService.open();
            }]
        });
})();
(function () {
    'use strict';

    angular
        .module('app')
        .component('mention', {
            templateUrl: 'mention.tpl.html',
            controllerAs: 'vm',
            bindings: {
                mention: '='
            },
            controller: ["$window", function ($window) {
                var vm = this;

                vm.mentionClick = mentionClick;

                function mentionClick() {
                    $window.open(vm.mention.url, '_blank');
                }
            }]
        });
})();
(function () {
    'use strict';

    var planeRed = '<i class="plane red"></i>';
    var planeBlue = '<i class="plane blue"></i>';

    var planeDomElementDieInSeconds = 2.8;

    angular
        .module('app')
        .component('mentionBattle', {
            templateUrl: 'mention-battle.tpl.html',
            controllerAs: 'vm',
            controller: ["$scope", "$element", "events", "$timeout", function ($scope, $element, events, $timeout) {
                var target = $element[0].querySelector('.container');
                var lastPlane = Date.now();

                $scope.$on(events.NEW_MENTION, makePlane);

                function makePlane($event, contenderNumber) {
                    if (Date.now() - lastPlane < 200) {
                        return;
                    }

                    var newPlane = angular.element(contenderNumber === 1 ? planeRed : planeBlue);
                    angular.element(target).append(newPlane);
                    $timeout(function () {
                        newPlane.addClass('move');
                    });
                    $timeout(function () {
                        newPlane.remove();
                    }, planeDomElementDieInSeconds * 1000);
                    lastPlane = Date.now();
                }
            }]
        });
})();
(function () {
    'use strict';

    angular
        .module('app')
        .component('navbar', {
            templateUrl: 'navbar.tpl.html'
        });
})();
(function () {
    'use strict';
    angular
        .module('app')
        .service('config', ["$http", "$q", function ($http, $q) {
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
        }]);
})();
(function () {
    'use strict';

    angular
        .module('app')
        .constant('events', {
            NEW_MENTION: 'app.newMention',
            NEW_CONTENDERS: 'app.newContenders'
        });
})();
(function () {
    'use strict';

    angular
        .module('app')
        .constant('wsStates', {
            CONNECTING: 0,
            OPEN: 1,
            CLOSING: 2,
            CLOSED: 3
        });
})();
(function () {
    'use strict';

    angular
        .module('app')
        .directive('preserveHeight', preserveHeight);

    function preserveHeight() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return element.parent()[0].clientHeight;
                }, function (newh) {
                    var start = newh - attrs.topOffset;
                    element.css('height', Math.floor(start / attrs.preserveHeight) * attrs.preserveHeight);
                });
            }
        };
    }
})();
(function () {
    'use strict';

    momentFilter.$inject = ["moment"];
    angular
        .module('app')
        .filter('moment', momentFilter);

    function momentFilter(moment) {
        return function (input, momentFn) {
            var args = Array.prototype.slice.call(arguments, 2),
                momentObj = moment(input);
            return momentObj[momentFn].apply(momentObj, args);
        };
    }
})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Contender', ["Mention", "_", function (Mention, _) {

            var obj = function (options) {
                this.name = options.name;
                this.votes = options.votes;
                this.image = options.image;
                this.ignoredMentions = [];
                this.areMentionsIgnored = false;
                this.mentions = _.map(options.mentions, function (rawMention) {
                    return new Mention(rawMention);
                });
            };

            obj.prototype.addMention = function (mention) {
                this.votes++;
                if (!this.areMentionsIgnored) {
                    this.mentions.unshift(new Mention(mention));
                    if (_.size(this.mentions) >= 100) {
                        this.mentions.pop();
                    }
                } else {
                   this.ignoredMentions.push(mention);
                }
            };

            obj.prototype.toggleIgnoreMentions = function (toggle) {

                this.areMentionsIgnored = toggle;
                if (!toggle) {
                    var self = this;
                    _.each(this.ignoredMentions, function (mention) {
                        self.votes--;
                        self.addMention(mention);
                    });
                    this.ignoredMentions = [];
                }
            };

            return obj;
        }]);
})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Mention', ["moment", function (moment) {
            var obj = function (options) {
                this.from = options.from;
                this.name = options.name;
                this.text = options.text;
                this.url = options.url;
                this.avatarUrl = options.avatarUrl;
                this.timestamp = moment(options.timestamp);
            };

            return obj;
        }]);
})();
(function () {
    'use strict';

    contendersRepository.$inject = ["Contender", "loadingState", "$rootScope", "events"];
    angular
        .module('app')
        .service('contendersRepository', contendersRepository);

    function contendersRepository(Contender, loadingState, $rootScope, events) {

        var contenders = {};

        return {
            getContender: getContender,
            setContenders: setContenders,
            addMention: addMention
        };

        function getContender(number) {
            return contenders[number];
        }

        function setContenders(input) {
            contenders[1] = new Contender(_.first(input.contenders));
            contenders[2] = new Contender(_.last(input.contenders));
            loadingState.setState('done');
            $rootScope.$broadcast(events.NEW_CONTENDERS);
        }

        function addMention(mention) {
            contenders[mention.contender].addMention(mention.msg);
            $rootScope.$broadcast(events.NEW_MENTION, mention.contender);
        }
    }

})();
(function () {
    'use strict';

    loadingState.$inject = ["$timeout"];
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
(function () {
    'use strict';

    wsService.$inject = ["$log", "$timeout", "$rootScope", "config", "contendersRepository", "loadingState"];
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