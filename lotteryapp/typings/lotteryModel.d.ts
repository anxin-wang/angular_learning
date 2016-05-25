/**
 * Created by developer on 2014/11/10.
 */

interface ILottery{
    code:string; //彩种代码
    name:string; //彩种名称
    type: number; // 1,福彩  2,体彩
    isActive:boolean;

    gameRules:{
        playMethod:number; //玩法  1，直选
        castMethod:number; //投注方式, 1, 单式
        maxMultiple: number;  //最大投注倍数
        enabled: boolean  //是否有效
    } [];

    currentPeriod:IPeriod; //当前期次
    lastPeriod: IHistoryPeriod; //最近的一期，冗余数据
    availablePeriods:IPeriod[]; //包括 当前 及 将来可用的期次

    prizePoolAmount?:number;//奖池累计金额
}

//彩票的出票商，上家， 如： 新冠，恒鹏...
interface IChannel{
    code:string;
    name:string;
    isActive:boolean;
    offline?:boolean;
    balance:number;
    lotteries:{code:string; type:number; isActive:boolean }[];
}

//代理商， 下家， 如： 习正、18彩票、返利网
interface IMerchant{
    merId:string;
    name:string;
    balance: number;
    lotteryCodes:string[];
    //periods:string[];
    isActive:boolean;
    password:string;
}

interface IPeriod {
    lotteryCode:string;
    periodCode:string;
    startTime: Date;
    stopTime: Date;
    lotteryTime:Date;
}

interface IHistoryPeriod extends IPeriod{
    awardCode:string; //中奖的号码
    awardListFetched:boolean; //是否已经获取过awardList，缺省未设置
}

//彩票订单
interface IBetOrder{
    lotteryCode: string;
    periodCode:string;
    user:{id:string; name:string; email:string; mobile:string; card:  {type:number;number:string}};

    castCodes:{castCode:string; playMethod:number;castMethod:number;multiple:number }[];
    channelOrderId: string;
    channelSubmitTime: Date;
    submitTime: Date;
    amount:number; //分

    memo:string;
}


interface IBetParams{
    merchant:IMerchant;
    userId:string;
    userName:string;
    card:{type:number;number:string};
    email:string;
    mobile:string;

    lotteryCode:string;
    periodCode:string;
    castCode:string;
    playMethod:number;
    castMethod:number;
    multiple:number;
    amount:number;

    memo:string;
}


//中奖信息
interface ILotteryAward{
    //todo: 联合索引
    lotteryCode:string; //彩票种类
    periodCode:string;  //期次

    channelOrderId:string; //Channel-side 订单的Id（新冠给出的Id）
    userName:string;
    cardType:number;
    cardNumber:string;  //default 0:idCard

    castList:{ castCode:string;//投注号码
        playMethod:number;
        castMethod:number;
        multiple:number;
        castAmount:number;
    }[];

    bonusGradeNum:number; //奖级数
    bonusCountGroupByGrade:number[];//每个奖级的中奖个数

    prize:number; //奖金

    methodMultiple:number; //todo: 方式倍率
    castMultiple:number;//todo: 投注倍率

    prizeType: number; //是否大奖（0-小 奖；1-大奖）

    userId:string;
    orderId:string;
}

//中奖信息
interface ILotteryAwardGrade{
    grade: number; //奖级
    description:string;
    bonus: number;
    localAreaWinnerCount: number;
    wholeCountryWinnerCount: number;
}
