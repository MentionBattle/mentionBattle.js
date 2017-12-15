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
            controller: function ($window) {
                var vm = this;

                vm.mentionClick = mentionClick;

                function mentionClick() {
                    $window.open(vm.mention.url, '_blank');
                }
            }
        });
})();