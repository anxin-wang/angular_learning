/**
 * Created by developer on 2014/11/27.
 */

describe('lotteryService', function() {
    beforeEach(module('lottery'));

    var Lottery;

    beforeEach(inject(function(_Lottery_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        Lottery = _Lottery_;
    }));

    describe('service basic func', function() {
        it('should called success and return 401', function() {

            expect(Lottery.postOrder).toBeDefined()
        });
    });
});