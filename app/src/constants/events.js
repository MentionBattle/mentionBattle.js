(function () {
    'use strict';

    angular
        .module('app')
        .constant('events', {
            NEW_MENTION: 'app.newMention',
            NEW_CONTENDERS: 'app.newContenders'
        });
})();