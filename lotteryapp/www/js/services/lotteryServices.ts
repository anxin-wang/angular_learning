///<reference path='../../../typings/app.d.ts'/>

/**
 * Created by fish, wanglei on 2014/11/19.
 */

//module lottery{
//    export class LotteryService{
//
//        public static $inject=[
//            '$q',
//            '$timeout',
//            '$rootScope',
//            '$ionicPopup',
//            'restangular',
//            'config'
//        ];
//
//        constructor(
//            private $q:ng.IQService,
//            private $timeout:ng.ITimeoutService,
//            private $rootScope:ng.IRootScopeService,
//            private $ionicPopup:any,
//            private Restangular:restangular.IProvider,
//            private Config:IConfig
//        ){
//            //this
//        }
//    }
//}

angular.module('lottery.lotteryServices', ['restangular','lottery.config'])
    .factory('Lottery' ,function($q, $timeout,$rootScope, $ionicPopup,Restangular,Config) {
        Restangular.setBaseUrl(Config.apiBackUrl);
        var lottery = Restangular.all("lottery")
        //http://121.40.194.203:9999/lottery/lotteries
        return {
            postOrder:function(order){
                return lottery.all('orders').post(order)
            },
            getOrderList:function(){
                return lottery.all('orders').getList()
            },
            getLotteryList:function(){
                return lottery.all('lotteries').getList()
            },
            //获取开奖公告
            getHistoryPeriods:function(){
                //Config.lotteryMap
                var deferred = $q.defer();
                var result={};
                lottery.all('lotteries').all('01').all("historyperiods").getList().then(function (lotteries) {
                    result= lotteries;
                    deferred.resolve(result);
                }) ;
                return deferred.promise;
            },
            setGlobalLotteries: function(){
                function emptyPromise(){
                    var defer = $q.defer();
                    $timeout(function(){defer.resolve()},1)
                    return defer.promise;
                }
                var refreshLotteries = false;
                if (!_.isEmpty($rootScope.lotteries)){
                    $rootScope.lotteries.forEach(function(it){
                        if (new Date(it.currentPeriod.lotteryTime) <= new Date())
                            refreshLotteries = true;
                    })
                }
                else
                    refreshLotteries = true;

                if (!refreshLotteries)
                    return emptyPromise();

                return lottery.all('lotteries').getList().then(function (lotteries) {
                    lotteries.forEach(function(it){
                        var lotteryConfig = Config.lotteryMap[it.code] || Config.lotteryMap["default"]
                        it.path = lotteryConfig.path
                    })
                    $rootScope.lotteries = lotteries;
                }).catch(function(err){
                    $ionicPopup.alert({
                        title: '出错啦',
                        template: '错误：' + (Config.debug ? JSON.stringify(err) : "获取数据失败")
                    });
                })
            }
        }
    })
    .factory('DoubleChromosphere',function(){
        var redBalls=[]
        var blueBalls=[]
        var i
        for(i=1;i<=33;i++)
            redBalls.push(_.str.lpad(i.toString(),2,"0"));
        for(i=1;i<=16;i++)
            blueBalls.push(_.str.lpad(i.toString(),2,"0"));

        return {
            createRandomCastCode:function(){
                var redBallsClone = _.clone(redBalls)
                var blueBallsClone = _.clone(blueBalls)
                return _.sample(redBallsClone,6).sort().join(',') + "|" + _.sample(blueBallsClone,1).pop()
            },
            toOrder:function(periodCode,castCodes,multiple){
                if (_.isEmpty(castCodes))
                    throw new Error("castCodes is missing");
                if (_.isString(castCodes))
                    castCodes = [castCodes];

                return {
                    lotteryCode:"01",
                    periodCode:periodCode,
                    castList:castCodes.map(function(it){
                        return {
                            castCode:it,
                            playMethod:1,
                            castMethod:1,
                            multiple:multiple
                        }
                    }),
                    amount:castCodes.length * multiple * 2
                }
            }
        }
    })