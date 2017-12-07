(function () {
    'use strict';

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
            contenders[1] = new Contender(input.contender1);
            contenders[2] = new Contender(input.contender2);
            loadingState.setState('done');
            $rootScope.$broadcast(events.NEW_CONTENDERS);
        }

        function addMention(mention) {
            contenders[mention.contender].addMention(mention.msg);
            $rootScope.$broadcast(events.NEW_MENTION, mention.contender);
        }
    }

})();