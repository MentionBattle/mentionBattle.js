(function () {
    'use strict'

    angular
        .module('app')
        .factory('Mention', function (moment) {
            var obj = function (options) {
                this.from = options.from;
                this.name = options.name;
                this.text = options.text;
                this.url = options.url;
                this.avatarUrl = options.avatarUrl;
                this.timestamp = moment(options.timestamp);
            };

            return obj;
        });
})();