/// <reference path="angularjs/angular.d.ts" />
/// <reference path="lodash/lodash.d.ts" />
/// <reference path="moment/moment.d.ts" />
/// <reference path="bluebird/bluebird.d.ts" />
/// <reference path="restangular/restangular.d.ts" />
/// <reference path="jquery/jquery.d.ts" />
/// <reference path="cordova/cordova.d.ts" />
/// <reference path="underscore.string/underscore.string.d.ts"/>
/// <reference path="cordova-ionic/cordova-ionic.d.ts" />

declare module _ {
    interface LoDashStatic {
        str:UnderscoreStringStatic;
    }
}

interface Window{
    cordova:Cordova;
    StatusBar:any;
}
