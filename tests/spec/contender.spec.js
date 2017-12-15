(function () {
    'use strict';

    describe('contender model', function () {
        var Contender = null;
        var instance = null;

        beforeEach(function () {
            module('app');
            inject(function ($injector) {
                Contender = $injector.get('Contender');
            });
            instance = new Contender({
                name: 'aaa',
                votes: 256,
                image: 'pathToImage',
                mentions: [
                    {}, {}, {}
                ]
            });
        });

        it('should map object properly', function () {
            expect(instance.name).toBe('aaa');
            expect(instance.votes).toBe(256);
            expect(instance.image).toBe('pathToImage');
            expect(_.size(instance.mentions)).toBe(3);
        });

        describe('addMention', function () {
            it('should work', function () {
                var oldVotes = instance.votes;
                instance.addMention({from: 'test'});
                expect(instance.votes).toBe(oldVotes + 1);
                expect(_.first(instance.mentions).from).toBe('test');
            });

            it('should stay under 100 mentions', function () {
                for (var i = 0; i < 1000; i++) {
                    instance.addMention({});
                }

                expect(_.size(instance.mentions)).toBe(99);
            });

            it('put mention to ignored when ignored flag is true', function () {
                var oldVotes = instance.votes;
                var oldMentions = angular.copy(instance.mentions);
                var oldIgnored = angular.copy(instance.ignoredMentions);
                instance.areMentionsIgnored = true;
                instance.addMention({from: 'test'});
                expect(instance.votes).toBe(oldVotes + 1);
                expect(_.size(instance.mentions)).toBe(_.size(oldMentions));
                expect(_.size(instance.ignoredMentions)).toBe(_.size(oldIgnored) + 1);
            });
        });

        describe('toggleIgnoreMentions', function () {
            it('should set toggle to True on activation', function () {
                instance.toggleIgnoreMentions(true);
                expect(instance.areMentionsIgnored).toBe(true);
            });

            it('should add ignored mentions to common on deactivation', function () {
                instance.toggleIgnoreMentions(true);
                var oldMentions = angular.copy(instance.mentions);
                var oldVotes = instance.votes;
                instance.addMention({from: 'test ignorance'});
                instance.toggleIgnoreMentions(false);
                expect(_.size(instance.mentions)).toBe(_.size(oldMentions) + 1);
                expect(_.size(instance.ignoredMentions)).toBe(0);
                expect(instance.votes).toBe(oldVotes + 1);
                expect(_.first(instance.mentions).from).toBe('test ignorance');
            });
        });
    });
})();