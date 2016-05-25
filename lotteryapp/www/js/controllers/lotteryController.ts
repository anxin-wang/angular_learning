///<reference path='../../../typings/app.d.ts'/>
/**
 * Created by developer on 2014/11/19.
 */
angular.module('lottery.lotteryControllers', [])
    .controller('LotteryListCtrl', function($rootScope,$ionicLoading,$scope,$ionicPopup,$state,Lottery) {
        Lottery.setGlobalLotteries().then(function(){
            $ionicLoading.hide();
        })
        $ionicLoading.show({
            template: 'Loading...'
        });

        $scope.checkLoginAndGo=function(lottery){
            var isLogin = !_.isEmpty($scope.user);
            if (!isLogin){
                $ionicPopup.alert({
                    title: '登录',
                    template: '亲，请先登录！'
                });
            }
            else{
                $state.go(lottery.path,{periodCode:lottery.currentPeriod.periodCode})
            }
        }
    })
    .controller('BuyDoubleBallCtrl', function($q,$scope,$rootScope,$ionicPopup,$stateParams,$state,DoubleChromosphere,Lottery,Config) {
        if (_.isEmpty($rootScope.lotteries))
            throw new Error("global lotteries not set");

        var doubleBallLottery =  _.findWhere($rootScope.lotteries,{code:"01"})
        var periodCode =doubleBallLottery.currentPeriod.periodCode;
        $scope.max=doubleBallLottery.availablePeriods.length;

        $scope.toBuyCastList=[];
        $scope.lotteryOption={};

        if ($stateParams.type === "random"){
            _.times(parseInt($stateParams.code),function(){
                $scope.toBuyCastList.push(DoubleChromosphere.createRandomCastCode())
            })
        }
        // todo: 手选号码
        else{}

        $scope.buy=function(){
            function performOneOrder(periodCode){
                var lottery = DoubleChromosphere.toOrder(periodCode,$scope.toBuyCastList,$scope.lotteryOption.multiple || 1);
                return Lottery.postOrder(lottery)
            }

            var posts = _.range(parseInt($scope.lotteryOption.periodCount)||1).map(function(it){
                var periodCode = doubleBallLottery.availablePeriods[it].periodCode;
                return performOneOrder(periodCode);
            })
            $q.all(posts).then(function(){
                $ionicPopup.alert({
                    title: '投注',
                    template: '投注成功！'
                });
            }).catch(function(err){
                $ionicPopup.alert({
                    title: '投注',
                    template: '投注失败！ 错误：'+(Config.debug?JSON.stringify(err):"获取数据失败")
                });
            }).finally(function(){
                $state.go("tab.dash")
            });
        }

        $scope.addRandomCastCode = function(){
            $scope.toBuyCastList.push(DoubleChromosphere.createRandomCastCode())
        }
    })