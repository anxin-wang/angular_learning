///<reference path='../../typings/app.d.ts'/>

/**
 * Created by fish on 2014/11/19.
 */

module lottery {
    var debug = true;

    var commonConfig = {
        lotteryMap: {
            "01": {
                path: "tab.doubleBall",
                name: "双色球"
            },
            "default": { //should be not implemented or just a error page
                path: "tab.error",
                name: "未知彩种"
            }
        }
    };

    var config;

    if (debug) {
        // test config here
        config = _.defaults({
            apiBackUrl: 'http://121.40.194.203:9999',
            debug: debug
        }, commonConfig)
    }
    else {
        // production config here
        config = _.defaults({
            debug: debug
        }, commonConfig)
    }

    angular.module('lottery.config', [])
        .constant('config', config);
}