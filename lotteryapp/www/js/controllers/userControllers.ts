///<reference path='../../../typings/app.d.ts'/>

angular.module('lottery.userControllers', [])


    .controller('LotteryCtrl', function($scope,$timeout, $ionicModal,User,$ionicPopup) {
        $scope.errMsg={};

      $ionicModal.fromTemplateUrl('templates/login-modal.html', function(modal) {
        $scope.loginModal = modal;
      }, {
        scope: $scope
      });

      $ionicModal.fromTemplateUrl('templates/register-modal.html', function(modal) {
        $scope.registerModal = modal;
      }, {
        scope: $scope
      });

      $scope.login = function() {
        $scope.loginModal.show();
      };

        $scope.register = function() {
            $scope.registerModal.show();
        };
      $scope.closeLogin = function() {
        $scope.loginModal.hide();
      }
        $scope.closeRegister = function() {

            $scope.registerModal.hide();
        }

        $scope.logout = function() {
            User.userLogout().then(function(result){
                if(result.logout){
                    $scope.user=null;
                }
            });
        };

        $scope.doRegister=function(user){
            var result=User.userRegister(user).then(function(result){
                if(result.success){
                    //TODO:注册成功的后续操作
                    $scope.user={};
                    $scope.user.username=result.user.email;

                    $scope.loginModal.hide();
                    $scope.registerModal.hide();

                }else{
                    //TODO:注册失败的后续操作
                    $scope.errMsg.registerMsg=result.errMsg;

                }
            });
        }

        $scope.doLogin=function(user){
            if(_.isEmpty($scope.user)){
                $scope.user={};
                User.userLogin(user).then(function(result){
                    if(result.success){
                        //TODO:登录成功的后续操作
                        $scope.user.username=result.user.email;

                        $scope.loginModal.hide();

                    }else{
                        //TODO:登录失败的后续操作
                        $scope.errMsg.loginMsg=result.errMsg;
                    }
                });
            }

        }

        $scope.$on('$destroy', function() {
            $scope.loginModal.remove();
            $scope.registerModal.remove();
        });
    })

//我的彩票
.controller('AccountCtrl', function($scope,User,Config,$rootScope,$ionicLoading,$ionicPopup) {
        $scope.limit= 5;
        $scope.skip=0;
        $scope.loading = false;
        $scope.page = 1;
        $scope.totalCount = 12;
        $scope.infiniteScroll=true;


        function getMyLotterys(limit,skip){
            var currentPeriodCodeMap=[];

            function makecurrentPeriodCodeMap(){
                $rootScope.lotteries.forEach(function(it,i){
                    var currentPeriodCode={};
                    currentPeriodCode.code=it.code;
                    currentPeriodCode.currentPeriod=it.currentPeriod.periodCode;
                    currentPeriodCodeMap.push(currentPeriodCode);
                })
            }
            function getCurrentPeriodCode(lotteryCode){
                if (_.isEmpty($rootScope.lotteries)) {
                    Lottery.setLotteries().then(function(lotteries){
                        $rootScope.lotteries=lotteries;
                        makecurrentPeriodCodeMap();
                    })
                }else{
                    makecurrentPeriodCodeMap();
                }
                return  _.str.toNumber(_.where(currentPeriodCodeMap,{"code":lotteryCode})[0].currentPeriod);
            }

            $scope.errMsg.authMsg="";
            //调用Services方法
            User.getMyLotterys(limit,skip).then(function(lotteries){
                $scope.refreshTime=moment().format("YYYY-MM-DD HH:mm:ss");
                $ionicLoading.hide();
                if(!_.isEmpty(lotteries)){
                    lotteries.forEach(function(it){
                        it.submitTime= moment(it.channelSubmitTime).format('YYYY-MM-DD HH:mm');
                        var lotteryConfig =Config.lotteryMap[it.lotteryCode] || Config.lotteryMap["default"];
                        it.lotteryType = lotteryConfig.name;

                        var periodCode=_.str.toNumber(it.periodCode);
                        if (periodCode>getCurrentPeriodCode(it.lotteryCode)){
                            it.prize="未开奖"
                        }else{
                            it.prize=_.isNumber(it.prize)?it.prize +"元" :"未中奖";
                        }
                    })
                }
                $scope.pagedlotterys=lotteries;


                $scope.mylotterys= _.union($scope.mylotterys,$scope.pagedlotterys);
                console.log($scope.mylotterys);

                $scope.loading = false;
                $scope.skip=$scope.limit+$scope.skip;
                console.log("skip:"+$scope.skip)
                $scope.page++;
                //$scope.totalPages = res.data.totalPages;
                $scope.$broadcast('scroll.infiniteScrollComplete');


            });
        }

        //$scope.setInitState=function(e,m){
        //    //判断是否是下拉更新，下拉更新不需要不然会影响下拉更新操作
        //    //if(!refresh){
        //    console.log("setInitState:"+this.scrollTop);
        //        console.log("开始加载新数据...")
        //        if(init){
        //            console.log("第一次加载数据....");
        //            init=false;
        //        }
        //        if(_.isEmpty($scope.pagedlotterys)){
        //            console.log("已获取所有数据....");
        //        }else{
        //            $scope.loadMore();
        //        }
        //   // }
        //
        //}

        $scope.doRefresh = function(e) {
            $scope.skip=0;
            $scope.mylotterys={};
            getMyLotterys($scope.limit,$scope.skip);
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.loadMore = function() {
            if(_.isEmpty($scope.user)){
                $scope.errMsg.authMsg="尚未登录，请先登录后使用"
            }else{
                console.log("加载中...")
                if (!$scope.loading && $scope.skip <= $scope.totalCount) {
                    $scope.loading = true;
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                    console.log("limit:"+$scope.limit);
                    console.log("skip:"+$scope.skip)
                    getMyLotterys($scope.limit,$scope.skip);
                    $scope.infiniteScroll=false;
                }else{
                    $ionicPopup.alert({
                        title: '提示',
                        template: '已获取所有彩票信息....！'
                    });
                    $scope.infiniteScroll=true;
                }
            }



            //if(_.isEmpty($scope.pagedlotterys)){
            //    $ionicPopup.alert({
            //        title: '提示',
            //        template: '已获取所有彩票信息....！'
            //    });
            //}else{
            //    $ionicLoading.show({
            //        template: 'Loading...'
            //    });
            //    skip=limit+skip;
            //    getMyLotterys(limit,skip);
            //}

           // $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        $scope.moreDataCanBeLoaded=function(){
           // 判断是否还需要继续加载数据，根据上一次加载的返回结果，如有可以继续加载，如为空无需继续加载
           // if(_.isEmpty($scope.pagedlotterys)){
           //     return false;
           // }else{
           //     return true;
           // }


        }

})


//开奖公告
.controller('NoticeCtrl', function($scope,Lottery,$ionicLoading) {
        Lottery.getHistoryPeriods().then(function(lottery){
            $ionicLoading.hide();
            $scope.historyPeriods=lottery;
        });
        $ionicLoading.show({
            template: 'Loading...'
        });





})

