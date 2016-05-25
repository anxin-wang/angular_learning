/// <reference path="tsd.d.ts" />
/// <reference path="lotteryModel.d.ts" />


declare module lottery {
    export interface IConfig {
        lotteryMap:{[code:string]:any};
        apiBackUrl:string;
        debug:boolean;
    }
}