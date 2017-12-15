(function () {
    'use strict'

    angular
        .module('app')
        .factory('Contender', function (Mention, _) {

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
        });
})();