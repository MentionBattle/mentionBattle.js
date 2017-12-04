(function () {
    'use strict'

    angular
        .module('app')
        .factory('Contender', function (Mention, _) {
            var obj = function (options) {
                this.name = options.name;
                this.votes = options.votes;
                this.mentions = _.map(options.mentions, function (rawMention) {
                    return new Mention(rawMention);
                });
            };

            obj.prototype.addMention = function (mention) {
                this.votes++;
                this.mentions.unshift(new Mention(mention));
            };

            return obj;
        });
})();