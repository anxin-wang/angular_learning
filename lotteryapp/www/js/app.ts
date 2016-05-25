///<reference path='../../typings/app.d.ts'/>

angular.module('lottery', ['ionic', 'lottery.userControllers','lottery.lotteryControllers', 'lottery.userServices','lottery.lotteryServices'])

.run(function($ionicPlatform, $rootScope,Lottery) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleDefault();
    }
  });
      Lottery.setGlobalLotteries()
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in userControllers.ts
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'LotteryListCtrl'
        }
      }
    })

    .state('tab.doubleBall', {
      url: '/doubleBall',
      views: {
        'tab-dash': {
          templateUrl: 'templates/double-ball.html'
        }
      }
    })

      .state('tab.buyDoubleBall', {
        url: '/doubleBall/:type/:code',
        views: {
          'tab-dash': {
            templateUrl: 'templates/buy-double-ball.html',
            controller: 'BuyDoubleBallCtrl'
          }
        }
      })

    //开奖公告
    .state('tab.notice', {
      url: '/notice',
      views: {
        'tab-notice': {
          templateUrl: 'templates/tab-notices.html',
          controller: 'NoticeCtrl'
        }
      }
    })

      //我的彩票
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })


    //帮助中心
      .state('tab.help', {
        url: '/help',
        views: {
          'tab-help': {
            templateUrl: 'templates/tab-help.html'
          }
        }
      })

      .state('tab.error', {
        url: '/error/*path',
        views: {
          'tab-dash': {
            templateUrl: 'templates/error.html'
          }
        }
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

