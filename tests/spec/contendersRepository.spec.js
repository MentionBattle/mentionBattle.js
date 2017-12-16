(function () {
    'use strict';
    describe('contendersRepository', function () {
        var contendersRepository = null;
        var $rootScope = null;
        var contenders = [{
            name: 'aaaa',
            votes: 25,
            image: 'unknown',
            mentions: [{}, {}]
        }, {
            name: 'bbbbb',
            votes: 50,
            image: 'unknown',
            mentions: [{}]
        }];

        beforeEach(function () {
            module('app');
            inject(function ($injector, _$rootScope_) {
                $rootScope = _$rootScope_;
                contendersRepository = $injector.get('contendersRepository');
            });
        });

        it('should map properly', function () {
            spyOn($rootScope, '$broadcast');
            contendersRepository.setContenders({contenders: contenders});
            expect($rootScope.$broadcast).toHaveBeenCalledWith('app.newContenders');
            var repositoryContenders = [contendersRepository.getContender(1), contendersRepository.getContender(2)];
            expect(repositoryContenders[0].name).toBe(contenders[0].name);
            expect(repositoryContenders[0].votes).toBe(contenders[0].votes);
            expect(repositoryContenders[0].image).toBe(contenders[0].image);
            expect(repositoryContenders[0].mentions.length).toBe(contenders[0].mentions.length);
            expect(repositoryContenders[1].name).toBe(contenders[1].name);
            expect(repositoryContenders[1].votes).toBe(contenders[1].votes);
            expect(repositoryContenders[1].image).toBe(contenders[1].image);
            expect(repositoryContenders[1].mentions.length).toBe(contenders[1].mentions.length);
        });

        it('should add mention to contender', function () {
            spyOn($rootScope, '$broadcast');
            contendersRepository.setContenders({contenders: contenders});
            var oldLength = contenders[0].mentions.length;
            contendersRepository.addMention({
                contender: 1,
                msg: {}
            });
            expect($rootScope.$broadcast).toHaveBeenCalledWith('app.newMention', 1);
            expect(contendersRepository.getContender(1).mentions.length).toBe(oldLength + 1);
        });
    });
})();