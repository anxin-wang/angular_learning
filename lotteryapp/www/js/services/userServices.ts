///<reference path='../../../typings/app.d.ts'/>

angular.module('lottery.userServices', ['restangular','lottery.config'])

    //.config(function(RestangularProvider) {
    //    RestangularProvider.setBaseUrl('http://localhost:9999');
    //})
    .factory('User', function($q, $timeout,Restangular,Config) {
        Restangular.setBaseUrl(Config.apiBackUrl)
        Restangular.setDefaultHttpFields({withCredentials :true})
        var users = Restangular.all('users');
        var lottery = Restangular.all('lottery');
        var user='';


        return {
            userLogin: function(user) {
                var deferred = $q.defer();
                //从页面获取信息
                var login_user={},result={};
                login_user.email=user.username==undefined?'':user.username;
                login_user.password=user.password==undefined?'':user.password;
                var valid = users.all("login").post(login_user).then(function(user_info){
                        result.success=true;
                        result.user=user_info.user;
                        deferred.resolve(result);
                    },function(err_msg){
                        result.success=false;

                        if(err_msg.status===401){
                            result.errMsg="用户名或密码错误，请重新登录";
                        }
                        deferred.resolve(result);
                    }
                );
                return deferred.promise;
            },

            userRegister: function(user) {
                var deferred = $q.defer();
                //从页面获取信息
                var register_user={},result={};
                register_user.email=_.isEmpty(user.username)?'':user.username;
                register_user.mobile=_.isEmpty(user.mobile)?'':user.mobile;
                register_user.password= _.isEmpty(user.password)?'':user.password;
                register_user.confirmPassword=_.isEmpty(user.confirmpassword)?'':user.confirmpassword;
                var valid = users.all("register").post(register_user).then(function(user_info){
                        result.success=true;
                        result.user=user_info.user;
                        deferred.resolve(result);
                    },function(err_msg){
                        result.success=false;
                        if(err_msg.status===400){
                            result.errMsg=err_msg.data;
                        }
                        deferred.resolve(result);
                    }
                );
                return deferred.promise;
            },
            userLogout:function(){
                var deferred = $q.defer();
                users.oneUrl('logout').get().then(function (callback) {
                    var result={};
                    result.logout=true;
                    deferred.resolve(result);
                });
                return deferred.promise;
            },
            //
            getMyLotterys:function(limit,skip){
                var deferred = $q.defer();
                lottery.all("orders").getList({'limit':limit,'skip':skip}).then(function (orderList) {
                    var result={};
                    result=orderList;
                    deferred.resolve(result);
                });
                return deferred.promise;
            }
        }


})


